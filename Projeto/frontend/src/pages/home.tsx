import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Card, Row, Button } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';
import ModalError from '../components/ModalError';
import ModalSuccess from '../components/ModalSucess';

function Home () {

    const baseUrl: string = "http://localhost:3000";

    const token = localStorage.getItem('x-access-token');
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');

    const history = useHistory();

    async function logout() {
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
        await axios.post(baseUrl + "/logout", {});
    }

    function modalAction(){
        if(errorStatus === 401){
            logout();
            return history.push('/');
        } else {
            return setShowModalError(false);
        }
    }

    const [showModalError, setShowModalError] = useState(false);
    const [errorStatus, setErrorStatus] = useState(Number);
    const [error, setError] = useState('');

    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [teacherSubject, setTeacherSubject] = useState<ISubject>();
    const [studentSubjects, setStudentSubjects] = useState<IStudentSubject[]>([]);

    function subjectOption(subject: ISubject){
        if(userType === "student"){

            for (const studentSubject of studentSubjects) {
                if(subject._id === studentSubject.subject){
                    return showSubjectStudent(subject);
                }
            }
    
            return enrollToSubject(subject);
            
        } else {
            if(subject._id === teacherSubject?._id){
                return showSubjectTeacher(subject);
            } else {
                return showTeacherMessage();
            }
        }
    }

    function showSubjectStudent(subject: ISubject){
        return (
            <Link to={`/subjectStudent/${subject._id}`}>
                Visitar a página
            </Link>
        ); 
    }

    function showSubjectTeacher(subject: ISubject){
        return (
            <Link to={`/subjectTeacher/${subject._id}`}>
                Visitar a página
            </Link>
        ); 
    }

    function showTeacherMessage(){
        return (
            <strong><p>Faça o login como aluno para acessar</p></strong>
        ); 
    }

    function enrollToSubject(subject: ISubject){
        return (
            <Button onClick={() => enroll(subject)}>
                Matricular
            </Button>
        ); 
    }

    async function enroll(subject: ISubject){
        try {
            const response = await axios.get(`${baseUrl}/enroll/${subject._id}`);
            setSuccessMessage(response.data.message);
            setShowModalSuccess(true);
        } catch(error){
            setError(error.response.data.message);
            setShowModalError(true);
            setErrorStatus(error.response.status);
        }
    }

    function showSituation(subject_id: any){
        if(userType === "student"){
            for (const studentSubject of studentSubjects) {
                if(subject_id === studentSubject.subject){
                    return (
                        <Card.Text className={studentSubject.situation}><strong>Situação: </strong>{studentSubject.situation}</Card.Text>
                    );
                }
            }
        } else {
            return (
                ""
            );
        }
    }

    async function loadSujects(){
        await axios.get(baseUrl + "/subjects").then(response => {
            setSubjects(response.data);
        });

        if(token && userId){
            if(userType === "student"){
                await axios.get(`${baseUrl}/student/${userId}`, { headers: {"x-access-token" : token} }).then(response => {
                    setStudentSubjects(response.data.subjects);
                }).catch(function (error) {
                    setError(error.response.data.message);
                    setShowModalError(true);
                    setErrorStatus(error.response.status);
                }); 
            } else {
                await axios.get(`${baseUrl}/teacherSubject`, { headers: {"x-access-token" : token} }).then(response => {
                    setTeacherSubject(response.data);
                }).catch(function (error) {
                    setError(error.response.data.message);
                    setShowModalError(true);
                    setErrorStatus(error.response.status);
                }); 
            }            
        }
    }

    useEffect(() => {
        loadSujects();
    },);

    return (
        <div>
            <CustomNavbar />

            <Container className="body">

                <Row className="text-center">
                    <h1>Projeto de WEB</h1>
                </Row>

                {subjects.map((subject: ISubject) => {
                    return (
                        <Card key={subject._id} className="mb-3" border="dark">
                            <Card.Body>
                                <Card.Title><strong>{subject.subjectName}</strong></Card.Title>
                                <Card.Text>{subject.subjectDescription}</Card.Text>
                                <Card.Text><strong>Professor: </strong>{subject.teacher.user.name}</Card.Text>
                                <Card.Text><strong>Email de contato: </strong>{subject.teacher.user.email}</Card.Text>
                                <Card.Text><strong>Descrição do professor: </strong>{subject.teacher.description}</Card.Text>

                                {showSituation(subject._id)}

                                <Card.Text className="text-end"><strong>Estudantes matriculados: </strong>{subject.students}</Card.Text>
                            </Card.Body>

                            {
                                token ? 
                                    <Card.Footer>
                                        {subjectOption(subject)}
                                    </Card.Footer>
                                :
                                    <Card.Footer>
                                        <strong><p>Faça o login para acessar</p></strong>
                                    </Card.Footer>
                            }
                        </Card>
                    )
                })}
            </Container>

            <ModalError show={showModalError} onHide={() => modalAction()} message={error} onClick={() => modalAction()}/>
            <ModalSuccess show={showModalSuccess} onHide={() => window.location.reload()} message={successMessage} onClick={() => window.location.reload()}/>
        </div>
    );
}   

export default Home;