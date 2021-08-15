import axios, { AxiosResponse } from "axios"
import Cookies from "universal-cookie";

const baseUrl: string = "http://localhost:3000"

export const getStudents = async (): Promise<AxiosResponse> => {
    try 
    {
        const students: AxiosResponse = await axios.get(baseUrl + "/students");
        return students;
    } catch (error) {
        throw new Error(error)
    }
}

export const getTeachers = async (): Promise<AxiosResponse> => {
    try 
    {
        const cookies = new Cookies();
        const token = cookies.get('x-access-token')
        // console.log('token', token);

        const teachers: AxiosResponse = await axios.get(baseUrl + "/teachers", { headers: {"x-access-token" : token} });
        return teachers;
    } catch (error) {
        alert(error);
        throw new Error(error)
    }
}

// export const login = async (): Promise<AxiosResponse> => {
//     try 
//     {
//         const auth: AxiosResponse = await axios.get(baseUrl + "/login");
//         return auth;
//     } catch (error) {
//         throw new Error(error)
//     }
// }