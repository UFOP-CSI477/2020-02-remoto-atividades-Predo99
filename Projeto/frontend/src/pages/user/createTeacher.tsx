import React, { useState } from 'react';
import axios from "axios"
import { useHistory } from "react-router-dom";
import CustomNavbar from '../../components/Navbar';
import { Button, Container, Form, Row } from 'react-bootstrap';
import BackButton from '../../components/BackButton';
import ModalError from '../../components/ModalError';

function CreateTeacher () {

    const baseUrl: string = "http://localhost:3000";
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState<any>([]);

    const [validated, setValidated] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const userType = "teacher";

    const [subjectName, setSubjectName] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');


    async function createTeacher(event: any) {
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
            data.append('userType', userType);
            data.append('description', description);
            data.append('subjectName', subjectName);
            data.append('subjectDescription', subjectDescription);

            var formData = JSON.stringify(Object.fromEntries(data.entries()));
            formData = JSON.parse(formData);

            try {
                const response = await axios.post(baseUrl + "/addTeacher", formData);
                alert(response.data.message);
                history.push('/login');
            } catch(error){
                if(error.response.status === 400){
                    setErrors(error.response.data.errors);
                } else {
                    setError(error.response.data.message);
                    setShowModal(true);
                }
            }
        }
    }

    return (
        <div>
            <CustomNavbar />

            <Container className="body">
                <Row className="text-center">
                    <h1>Cadastrar</h1>
                </Row>

                <Row>
                    <Form noValidate validated={validated} method="POST" onSubmit={createTeacher}>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control required type="text" placeholder="Digite o seu nome" onChange={event => setName(event.target.value)} isInvalid={errors['name']}/>

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
                            <Form.Control required type="email" placeholder="Digite o email cadastrado" onChange={event => setEmail(event.target.value)} isInvalid={errors['email']}/>

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
                            <Form.Control required type="password" placeholder="Digite a senha cadastrada" onChange={event => setPassword(event.target.value)} isInvalid={errors['password']}/>

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
                            <Form.Control required as="textarea" rows={3} placeholder="Digite uma descrição sobre sua formação" onChange={event => setDescription(event.target.value)} isInvalid={errors['description']}/>

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
                            <Form.Control required type="text" placeholder="Digite o nome da disciplina" onChange={event => setSubjectName(event.target.value)} isInvalid={errors['subjectName']}/>

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
                            <Form.Control required as="textarea" rows={3} placeholder="Digite uma descrição sobre a disciplina" onChange={event => setSubjectDescription(event.target.value)} isInvalid={errors['subjectDescription']}/>

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
                            <Button variant="primary" type="submit">Cadastrar</Button>
                        </div>

                    </Form>
                </Row>

                <BackButton />
            </Container>

            <ModalError show={showModal} onHide={() => setShowModal(false)} message={error} onClick={() => setShowModal(false)}/>
        </div>
    );
}   

export default CreateTeacher;