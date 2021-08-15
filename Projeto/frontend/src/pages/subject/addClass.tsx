import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import ModalError from '../../components/ModalError';
import ModalSuccess from '../../components/ModalSucess';
import CustomNavbar from '../../components/Navbar';

interface SubjectParams {
    id: string;
};

function AddClass () {

    const baseUrl: string = "http://localhost:3000";
    const history = useHistory();
    const params = useParams<SubjectParams>();
    const token = localStorage.getItem('x-access-token');

    const [showModalError, setShowModalError] = useState(false);
    const [errorStatus, setErrorStatus] = useState(Number);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState<any>([]);

    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [validated, setValidated] = useState(false);

    const [name, setName] = useState('');
    const [path, setPath] = useState('');

    function modalAction(){
        if(errorStatus === 401){
            return history.push('/');
        } else {
            return setShowModalError(false);
        }
    }

    async function addClass(event: any) {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } 

        setValidated(true);

        if (form.checkValidity() === true){
            try {

                const data = new FormData();
        
                data.append('name', name);
                data.append('path', path);

                var formData = JSON.stringify(Object.fromEntries(data.entries()));
                formData = JSON.parse(formData);

                const response = await axios.post(`${baseUrl}/addClass/${params.id}`, formData, { headers: {"x-access-token" : token} });

                setSuccessMessage(response.data.message);
                setShowModalSuccess(true);
                
            } catch(error){
                if(error.response.status === 400){
                    setErrors(error.response.data.errors);
                }  else {
                    setError(error.response.data.message);
                    setShowModalError(true);
                    setErrorStatus(error.response.status);
                }
            }
        }
        
    };

    return (
        <div>

            <CustomNavbar />

            <Container className="body">
                <Row className="text-center">
                    <h1>Adicionar aula</h1>
                </Row>

                <Row>
                    <Form noValidate validated={validated} method="POST" onSubmit={addClass}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Título</Form.Label>
                            <Form.Control required type="text" placeholder="Digite o título da aula" onChange={event => setName(event.target.value)} isInvalid={errors['name']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['name'] ? 
                                        <p>{errors['name'].message}</p>
                                    :   
                                        <p>Por favor digite um nome.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="path">
                            <Form.Label>Link do vídeo</Form.Label>
                            <Form.Control required type="text" placeholder="Digite o link do vídeo da aula" onChange={event => setPath(event.target.value)} isInvalid={errors['path']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['path'] ? 
                                        <p>{errors['path'].message}</p>
                                    :   
                                        <p>Por favor digite um link.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Cadastrar
                        </Button>

                    </Form>
                </Row>

                <BackButton />
            </Container>

            <ModalError show={showModalError} onHide={() => modalAction()} message={error} onClick={() => modalAction()}/>
            <ModalSuccess show={showModalSuccess} onHide={() => history.push(`/subjectTeacher/${params.id}`)} message={successMessage} onClick={() => history.push(`/subjectTeacher/${params.id}`)}/>
        </div>
    );
}   

export default AddClass;