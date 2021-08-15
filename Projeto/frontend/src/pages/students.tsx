import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
// import Student from '../components/Student';


function Students () {

    const baseUrl: string = "http://localhost:3000";
    const history = useHistory();

    const [students, setStudents] = useState<IStudent[]>([]);

    async function getStudents () {
        try 
        {
            const cookies = new Cookies();
            const token = cookies.get('x-access-token');
    
            const students: AxiosResponse = await axios.get(baseUrl + "/students", { headers: {"x-access-token" : token} });
            return students;
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    useEffect(() => {
        getStudents()
            .then(({ data: { students } }: IStudent[] | any) => setStudents(students))
            .catch((err: Error) => history.push('/login'))
    }, []);

    // return (
    //     <div>
    //         <h1>Students</h1>

    //         <Link to="/">
    //             Home
    //         </Link>

    //         {students.map((student: IStudent) => (
    //             <Student
    //                 key={student._id}
    //                 student={student}
    //             />
    //         ))}
    //     </div>
    // );
}   

export default Students;