import React, { useState } from 'react';
import axios from "axios"
import { useHistory } from "react-router-dom";
import { Button, Container, Form, Row } from 'react-bootstrap';
import CustomNavbar from '../../components/Navbar';
import BackButton from '../../components/BackButton';
import ModalError from '../../components/ModalError';

function Login () {

    const baseUrl: string = "http://localhost:3000";
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    const [validated, setValidated] = useState(false);

    async function login(event: any) {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } 

        setValidated(true);
    
        if(form.checkValidity() === true){
            const data = new FormData();
    
            data.append('email', email);
            data.append('password', password);

            var formData = JSON.stringify(Object.fromEntries(data.entries()));
            formData = JSON.parse(formData);
        
            try {
                const response = await axios.post(baseUrl + "/login", formData);
                const auth = response.data.auth;
                const token = response.data.token;
                const userId = response.data.userId;
                const userType = response.data.userType;

                if(auth && token){
                    localStorage.setItem('x-access-token', token);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('userType', userType);
                    // const cookies = new Cookies();
                    // cookies.set('x-access-token', token, {
                    //     maxAge: 3000
                    // });
                    // cookies.set('userId', userId, {
                    //     maxAge: 3000
                    // });
                    // cookies.set('userType', userType, {
                    //     maxAge: 3000
                    // });
                    history.push('/');
                }
            } catch(error){
                setError(error.response.data.message);
                setShowModal(true);
            }
        }
        
    };

    return (
        <div>
            <CustomNavbar />

            <Container className="body">
                <Row className="text-center">
                    <h1>Login</h1>
                </Row>

                <Row>
                    <Form noValidate validated={validated} method="POST" onSubmit={login}>
                        <div>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="email" placeholder="Digite o email cadastrado" onChange={event => setEmail(event.target.value)}/>

                                <Form.Control.Feedback type="invalid">
                                    Por favor digite um email.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control required type="password" placeholder="Digite a senha cadastrada" onChange={event => setPassword(event.target.value)}/>

                                <Form.Control.Feedback type="invalid">
                                    Por favor digite uma senha.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="buttonDiv">
                            <Button variant="primary" type="submit">Entrar</Button>
                        </div>

                        <BackButton />

                        <div>
                            <p>Não possui conta?</p>

                            <div className="buttonDiv">
                                <Button variant="success" href="/createStudent">Cadastre-se como um aluno</Button>
                            </div>

                            <div className="buttonDiv">
                                <Button variant="success" href="/createTeacher">Cadastre-se como um professor</Button>
                            </div>
                        </div>
                    </Form>
                </Row>

            </Container>

            <ModalError show={showModal} onHide={() => setShowModal(false)} message={error} onClick={() => setShowModal(false)}/>
        </div>
    );
}   

export default Login;