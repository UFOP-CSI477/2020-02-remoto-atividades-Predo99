import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import CustomNavbar from '../../components/Navbar';
import { Button, Card, Container, Nav, Row } from 'react-bootstrap';
import { AiOutlineFilePdf } from 'react-icons/ai';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import ModalError from '../../components/ModalError';
import ModalSuccess from '../../components/ModalSucess';
import ModalDelete from '../../components/ModalDelete';

interface SubjectParams {
    id: string;
};

function SubjectTeacher () {

    const baseUrl: string = "http://localhost:3000";
    const history = useHistory();
    const token = localStorage.getItem('x-access-token');

    const [showModal, setShowModal] = useState(false);
    const [errorStatus, setErrorStatus] = useState(Number);
    const [error, setError] = useState('');

    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [deleteType, setDeleteType] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [showModalDelete, setShowModalDelete] = useState(false);

    const params = useParams<SubjectParams>();
    const [subject, setSubject] = useState<ISubject>();

    function modalAction(){
        if(errorStatus === 401){
            return history.push('/');
        } else {
            return setShowModal(false);
        }
    }

    async function returnSlide(path: string, name: string){
        try 
        {
            const { data } = await getPdf(path);

            const blob = new Blob([data as unknown as BlobPart], { type: 'application/pdf' });
            saveAs(blob, name + ".pdf");

        } catch (error) {
            setError(error.response.data.message);
            setShowModal(true);
            setErrorStatus(error.response.status);
        }
    }

    async function getPdf(path: string) {
        return axios.get(baseUrl + "/returnSlide/" + path, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-access-token' : token
            },
            responseType: 'arraybuffer'
        });
    }

    async function remove(id: any, type: string){
        setDeleteId(id);
        setDeleteType(type);
        setShowModalDelete(true);
    }

    function removeAction(){
        if(deleteType === 'Aula'){
            return removeClass(deleteId);
        } else if(deleteType === 'Slide'){
            return removeSlide(deleteId);
        } else {
            return removeActivity(deleteId);
        }
    }

    async function removeClass(classId: any){
        axios.delete(`${baseUrl}/removeClass/${params.id}/${classId}`, { headers: {"x-access-token" : token} })
            .then(response => {
                setSuccessMessage(response.data.message);
                setShowModalSuccess(true); 
            })
            .catch(function (error) {
                setError(error.response.data.message);
                setShowModal(true);
                setErrorStatus(error.response.status);
            });
    }

    async function removeSlide(slideId: any){
        axios.delete(`${baseUrl}/removeSlide/${params.id}/${slideId}`, { headers: {"x-access-token" : token} })
            .then(response => {
                setSuccessMessage(response.data.message);
                setShowModalSuccess(true); 
            })
            .catch(function (error) {
                setError(error.response.data.message);
                setShowModal(true);
                setErrorStatus(error.response.status);
            });
    }

    async function removeActivity(activityId: any){
        axios.delete(`${baseUrl}/removeActivity/${params.id}/${activityId}`, { headers: {"x-access-token" : token} })
            .then(response => {
                setSuccessMessage(response.data.message);
                setShowModalSuccess(true); 
            })
            .catch(function (error) {
                setError(error.response.data.message);
                setShowModal(true);
                setErrorStatus(error.response.status);
            });
    }

    useEffect(() => {
        axios.get(`${baseUrl}/subject/${params.id}`, { headers: {"x-access-token" : token} })
            .then(response => {
                setSubject(response.data);
            })
            .catch(function (error) {
                setError(error.response.data.message);
                setShowModal(true);
                setErrorStatus(error.response.status);
            })
    }, [params.id, history, token]);


    if(!subject) {
        return (
            <div>
                <Loading />
                <ModalError show={showModal} onHide={() => modalAction()} message={error} onClick={() => modalAction()}/>
            </div>
        );
    }

    return (
        <div>
            <CustomNavbar />

            <Container className="body">
                <Row className="text-center">
                    <h1>{subject.subjectName}</h1>
                </Row>

                <Nav className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link href={`/addClass/${subject._id}`}>Adicionar aula</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={`/addSlide/${subject._id}`}>Adicionar slide</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={`/addActivity/${subject._id}`}>Adicionar atividade</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Card className="mb-3">
                    <Card.Header as="h2" className="text-center">Aulas</Card.Header>
                    <Card.Body>
                        <ul>
                            {subject.classes.map((classe: IClass) => {
                                return (
                                    <li key={classe._id}>
                                        <h3>{classe.name}</h3>
                                        
                                        <p>Disponível em: <a href={classe.path} target="_blank" rel="noreferrer">{classe.path}</a></p>

                                        <p><strong>Ações: </strong></p>
                                        <Button variant="warning" href={`/editClass/${subject._id}/${classe._id}`}>Editar</Button>{' '}
                                        <Button variant="danger" onClick={() => {remove(classe._id, "Aula")}}>Excluir</Button>
                                        <hr />
                                    </li>
                                )
                            })}
                        </ul>
                    </Card.Body>
                </Card>

                <Card className="mb-3">
                    <Card.Header as="h2" className="text-center">Slides</Card.Header>
                    <Card.Body>
                        <ul>
                            {subject.slides.map((slide: IFile) => {
                                return(
                                    <li key={slide._id}>
                                        <h3>{slide.name}</h3>

                                        <p>
                                            <Button onClick={() => returnSlide(slide.path, slide.name)}><AiOutlineFilePdf />Fazer download</Button>
                                        </p>

                                        <p><strong>Ações: </strong></p>
                                        <Button variant="warning" href={`/editSlide/${subject._id}/${slide._id}`}>Editar</Button>{' '}
                                        <Button variant="danger" onClick={() => {remove(slide._id, "Slide")}}>Excluir</Button>
                                        <hr />
                                    </li>
                                );
                            })}
                        </ul>
                    </Card.Body>
                </Card>

                <Card className="mb-3">
                    <Card.Header as="h2" className="text-center">Atividades</Card.Header>
                    <Card.Body>
                        <ul>
                            {subject.activities.map((activity: IActivity) => {
                                return(
                                    <li key={activity._id}>
                                        <h3>{activity.name}</h3>

                                        <p>
                                            <Link to={`/showActivityTeacher/${subject._id}/${activity._id}`}>
                                                Visualizar
                                            </Link>
                                        </p>

                                        <p><strong>Ações: </strong></p>
                                        <Button variant="warning" href={`/editActivity/${subject._id}/${activity._id}`}>Editar</Button>{' '}
                                        <Button variant="danger" onClick={() => {remove(activity._id, "Atividade")}}>Excluir</Button>
                                        <hr />
                                    </li>
                                );
                            })}
                        </ul>
                    </Card.Body>
                </Card>

                <BackButton />

            </Container>

            <ModalError show={showModal} onHide={() => modalAction()} message={error} onClick={() => modalAction()}/>
            <ModalSuccess show={showModalSuccess} onHide={() => window.location.reload()} message={successMessage} onClick={() => window.location.reload()}/>

            <ModalDelete show={showModalDelete} onHide={() => setShowModalDelete(false)} onYes={() => removeAction()} onClose={() => setShowModalDelete(false)}/>
        </div>
    );
}   

export default SubjectTeacher;