import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import ModalError from '../../components/ModalError';
import ModalSuccess from '../../components/ModalSucess';
import CustomNavbar from '../../components/Navbar';

interface SubjectParams {
    id: string;
};

function AddSlide () {

    const baseUrl: string = "http://localhost:3000";
    const params = useParams<SubjectParams>();
    const history = useHistory();
    const token = localStorage.getItem('x-access-token');

    const [showModalError, setShowModalError] = useState(false);
    const [errorStatus, setErrorStatus] = useState(Number);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState<any>([]);

    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [validated, setValidated] = useState(false);

    const [name, setName] = useState('');
    const [slide, setSlide] = useState<File>();


    function modalAction(){
        if(errorStatus === 401){
            return history.push('/');
        } else {
            return setShowModalError(false);
        }
    }

    function handleSelectFile(event: ChangeEvent<HTMLInputElement>){
        if(!event.target.files){
            return;
        }

        setSlide(event.target.files[0]);
    }

    async function addSlide(event: any) {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } 

        setValidated(true);

        if (form.checkValidity() === true){
            const data = new FormData();
            data.append('name', name);
            if(slide){
                data.append('slide', slide);
            }

            try {
                const response = await axios.post(`${baseUrl}/addSlide/${params.id}`, data, { headers: {"x-access-token" : token} });

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
                    <h1>Adicionar slide</h1>
                </Row>

                <Row>
                    <Form noValidate validated={validated} method="POST" onSubmit={addSlide}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control required type="text" placeholder="Digite o nome do slide" onChange={event => setName(event.target.value)} isInvalid={errors['name']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['name'] ? 
                                        <p>{errors['name'].message}</p>
                                    :   
                                        <p>Por favor digite um nome.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="slide" className="mb-3">
                            <Form.Label>Adicionar slide</Form.Label>
                            <Form.Control required type="file" onChange={handleSelectFile} accept="application/pdf" isInvalid={errors['path']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['path'] ? 
                                        <p>{errors['path'].message}</p>
                                    :   
                                        <p>Por favor selecione um arquivo.</p>
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

export default AddSlide;