import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useHistory } from "react-router-dom";
import CustomNavbar from '../../components/Navbar';
import { Button, Container, Form, Row } from 'react-bootstrap';
import BackButton from '../../components/BackButton';
import ModalError from '../../components/ModalError';
import ModalSuccess from '../../components/ModalSucess';
import Loading from '../../components/Loading';

function EditStudent () {

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

    function modalAction(){
        if(errorStatus === 401){
            return history.push('/');
        } else {
            return setShowModalError(false);
        }
    }

    async function updateStudent(event: any) {
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

            var formData = JSON.stringify(Object.fromEntries(data.entries()));
            formData = JSON.parse(formData);

            try {
                const response = await axios.patch(`${baseUrl}/student/${userId}`, formData, { headers: {"x-access-token" : token} });
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
                    <h1>Editar</h1>
                </Row>

                <Row>
                    <Form noValidate validated={validated} method="POST" onSubmit={updateStudent}>

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
                            <Form.Control required type="email" defaultValue={email} placeholder="Digite o seu email" onChange={event => setEmail(event.target.value)} isInvalid={errors['email']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['name'] ? 
                                        <p>{errors['email'].message}</p>
                                    :   
                                        <p>Por favor digite um email.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Digite a sua senha" onChange={event => setPassword(event.target.value)} isInvalid={errors['password']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['name'] ? 
                                        <p>{errors['password'].message}</p>
                                    :   
                                        <p>Por favor digite uma senha.</p>
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

export default EditStudent;