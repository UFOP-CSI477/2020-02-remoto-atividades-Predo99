import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useHistory } from "react-router-dom";
import CustomNavbar from '../../components/Navbar';
import { Button, Container, Form, Row } from 'react-bootstrap';
import BackButton from '../../components/BackButton';
import ModalError from '../../components/ModalError';
import ModalSuccess from '../../components/ModalSucess';
import Loading from '../../components/Loading';

function EditTeacher () {

    const baseUrl: string = "http://localhost:3000";
    const history = useHistory();
    const token = localStorage.getItem('x-access-token');
    const userId = localStorage.getItem('userId');
    
    const [showModalError, setShowModalError] = useState(false);
    const [errorStatus, setErrorStatus] = useState(Number);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState<any>([]);

    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [validated, setValidated] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');

    const [subjectName, setSubjectName] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');

    function modalAction(){
        if(errorStatus === 401){
            return history.push('/');
        } else {
            return setShowModalError(false);
        }
    }

    async function updateTeacher(event: any) {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } 

        setValidated(true);

        if(form.checkValidity() === true) {
            const data = new FormData();
        
            data.append('name', name);
            data.append('email', email);
            data.append('password', password);
            data.append('description', description);
            data.append('subjectName', subjectName);
            data.append('subjectDescription', subjectDescription);

            var formData = JSON.stringify(Object.fromEntries(data.entries()));
            formData = JSON.parse(formData);

            try {
                const response = await axios.patch(`${baseUrl}/teacher/${userId}`, formData, { headers: {"x-access-token" : token} });
                setSuccessMessage(response.data.message);
                setShowModalSuccess(true);
            } catch(error){
                if(error.response.status === 400){
                    setErrors(error.response.data.errors);
                } else {
                    setError(error.response.data.message);
                    setShowModalError(true);
                    setErrorStatus(error.response.status);
                }
            }
        }
    }

    useEffect(() => {
        axios.get(`${baseUrl}/getUser`, { headers: {"x-access-token" : token} })
            .then(response => {
                setName(response.data.name);
                setEmail(response.data.email);
            })
            .catch(function (error) {
                setError(error.response.data.message);
                setShowModalError(true);
                setErrorStatus(error.response.status);
            });

        axios.get(`${baseUrl}/teacher/${userId}`, { headers: {"x-access-token" : token} })
            .then(response => {
                setDescription(response.data.description);
            })
            .catch(function (error) {
                setError(error.response.data.message);
                setShowModalError(true);
                setErrorStatus(error.response.status);
            });

        axios.get(`${baseUrl}/teacherSubject`, { headers: {"x-access-token" : token} })
            .then(response => {
                setSubjectName(response.data.subjectName);
                setSubjectDescription(response.data.subjectDescription);
            })
            .catch(function (error) {
                setError(error.response.data.message);
                setShowModalError(true);
                setErrorStatus(error.response.status);
            });

    }, [token, userId]);

    if(!name || !email) {
        return (
            <div>
                <Loading />
                <ModalError show={showModalError} onHide={() => modalAction()} message={error} onClick={() => modalAction()}/>
            </div>
        );
    }

    return (
        <div>
            <CustomNavbar />

            <Container className="body">
                <Row className="text-center">
                    <h1>Cadastrar</h1>
                </Row>

                <Row>
                    <Form noValidate validated={validated} method="POST" onSubmit={updateTeacher}>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control required type="text" defaultValue={name} placeholder="Digite o seu nome" onChange={event => setName(event.target.value)} isInvalid={errors['name']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['name'] ? 
                                        <p>{errors['name'].message}</p>
                                    :   
                                        <p>Por favor digite um nome.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" defaultValue={email} placeholder="Digite o email cadastrado" onChange={event => setEmail(event.target.value)} isInvalid={errors['email']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['email'] ? 
                                        <p>{errors['email'].message}</p>
                                    :   
                                        <p>Por favor digite um email.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Digite a senha cadastrada" onChange={event => setPassword(event.target.value)} isInvalid={errors['password']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['password'] ? 
                                        <p>{errors['password'].message}</p>
                                    :   
                                        <p>Por favor digite uma senha.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control required as="textarea" defaultValue={description} rows={3} placeholder="Digite uma descrição sobre sua formação" onChange={event => setDescription(event.target.value)} isInvalid={errors['description']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['description'] ? 
                                        <p>{errors['description'].message}</p>
                                    :   
                                        <p>Por favor digite uma descrição.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="subject_name">
                            <Form.Label>Nome da disciplina</Form.Label>
                            <Form.Control required type="text" defaultValue={subjectName} placeholder="Digite o nome da disciplina" onChange={event => setSubjectName(event.target.value)} isInvalid={errors['subjectName']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['subjectName'] ? 
                                        <p>{errors['subjectName'].message}</p>
                                    :   
                                        <p>Por favor digite um nome.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="subject_description">
                            <Form.Label>Descrição da disciplina</Form.Label>
                            <Form.Control required as="textarea" defaultValue={subjectDescription} rows={3} placeholder="Digite uma descrição sobre a disciplina" onChange={event => setSubjectDescription(event.target.value)} isInvalid={errors['subjectDescription']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['subjectDescription'] ? 
                                        <p>{errors['subjectDescription'].message}</p>
                                    :   
                                        <p>Por favor digite uma descrição.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="buttonDiv">
                            <Button variant="primary" type="submit">Editar</Button>
                        </div>

                    </Form>
                </Row>

                <BackButton />
            </Container>

            <ModalError show={showModalError} onHide={() => modalAction()} message={error} onClick={() => modalAction()}/>
            <ModalSuccess show={showModalSuccess} onHide={() => history.push(`/profile`)} message={successMessage} onClick={() => history.push(`/profile`)}/>
        </div>
    );
}   

export default EditTeacher;