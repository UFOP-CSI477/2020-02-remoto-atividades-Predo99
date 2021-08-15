import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";

function Teachers () {

    const baseUrl: string = "http://localhost:3000";
    const history = useHistory();

    async function getTeachers () {
        try 
        {
            const cookies = new Cookies();
            const token = cookies.get('x-access-token');
    
            const teachers: AxiosResponse = await axios.get(baseUrl + "/teachers", { headers: {"x-access-token" : token} });
            return teachers;
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const [teachers, setTeachers] = useState<ITeacher[]>([]);

    useEffect(() => {
        getTeachers()
            .then(({ data: { teachers } }: ITeacher[] | any) => setTeachers(teachers))
            .catch((err: Error) => history.push('/login'))
    }, []);

    return (
        <div>
            <h1>Teachers</h1>

            <Link to="/">
                Home
            </Link>

            {teachers.map((teacher: ITeacher) => {
                return (
                    <div key={teacher._id}>
                        <p> {teacher.user.name}</p>
                        <p> {teacher.user.email}</p>
                        <hr />
                    </div>
                )
            })}
        </div>
    );
}   

export default Teachers;