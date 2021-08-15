import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import CustomNavbar from '../../components/Navbar';
import { AiOutlineFilePdf } from 'react-icons/ai';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import ModalError from '../../components/ModalError';

interface SubjectParams {
    id: string;
};

function SubjectStudent () {

    const baseUrl: string = "http://localhost:3000";
    const token = localStorage.getItem('x-access-token');
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [errorStatus, setErrorStatus] = useState(Number);
    const [error, setError] = useState('');

    const params = useParams<SubjectParams>();
    const [subject, setSubject] = useState<ISubject>();
    const [answers, setAnswers] = useState<IAnswer[]>([]);

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

    function activityOption(subject: ISubject, activity: IActivity){

        let studentAnswers:any = [];

        for (const answer of answers) {
            if(activity._id === answer.activity){
                studentAnswers.push(answer._id) ;
            }
        }

        if(studentAnswers.length > 0){
            var listItems:any = [];

            for (const answer of studentAnswers) {
                listItems.push(showAnswer(answer, subject, activity));
            }

            return <ul>{listItems}</ul>;
        }
    }

    function answerActivity(subject: ISubject, activity: IActivity){
        return (
            <Link to={`/showActivityStudent/${subject._id}/${activity._id}`}>
                Responder
            </Link>
        ); 
    }

    function showAnswer(answer: any, subject: ISubject, activity: IActivity){
        return  (
            <li key={answer}>
                <Link to={`/showAnsweredActivity/${subject._id}/${activity._id}/${answer}`}>
                    Visualizar feedback
                </Link>
            </li>
        );
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
            });

        axios.get(`${baseUrl}/showAnswers/${params.id}`, { headers: {"x-access-token" : token} })
            .then(response => {
                setAnswers(response.data);
            })
            .catch(function (error) {
                setError(error.response.data.message);
                setShowModal(true);
                setErrorStatus(error.response.status);
            })

    }, [params.id, token]);

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

                <Card className="mb-3">
                    <Card.Header as="h2" className="text-center">Aulas</Card.Header>
                    <Card.Body>
                        <ul>
                            {subject.classes.map((classe: IClass) => {
                                return (
                                    <li key={classe._id}>
                                        <h3>{classe.name}</h3>
                                        
                                        <p>Disponível em:  <a href={classe.path} target="_blank" rel="noreferrer">{classe.path}</a></p>
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

                                        <Button onClick={() => returnSlide(slide.path, slide.name)}><AiOutlineFilePdf />Fazer download</Button>
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

                                        {activityOption(subject, activity)}

                                        {answerActivity(subject, activity)}
                                    </li>
                                );
                            })}
                        </ul>
                    </Card.Body>
                </Card>

                <BackButton />

            </Container>

            <ModalError show={showModal} onHide={() => modalAction()} message={error} onClick={() => modalAction()}/>

        </div>
    );
}   

export default SubjectStudent;