import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CustomNavbar from '../../components/Navbar';
import { Card, Container, Form, Row } from 'react-bootstrap';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import ModalError from '../../components/ModalError';

interface SubjectParams {
    id: string;
    activity: string;
    answer: string;
};

function ShowAnsweredActivity () {

    const baseUrl: string = "http://localhost:3000";
    const history = useHistory();
    const token = localStorage.getItem('x-access-token');

    const [showModal, setShowModal] = useState(false);
    const [errorStatus, setErrorStatus] = useState(Number);
    const [error, setError] = useState('');

    const params = useParams<SubjectParams>();
    const [activity, setActivity] = useState<IActivity>();
    const [answer, setAnswer] = useState<IAnswer>();

    function modalAction(){
        if(errorStatus === 401){
            return history.push('/');
        } else {
            return setShowModal(false);
        }
    }

    useEffect(() => {
        axios.get(`${baseUrl}/showActivity/${params.id}/${params.activity}`, { headers: {"x-access-token" : token} })
            .then(response => {
                setActivity(response.data);
            })
            .catch(function (error) {
                setError(error.response.data.message);
                setShowModal(true);
                setErrorStatus(error.response.status);
            });
        axios.get(`${baseUrl}/showAnswer/${params.answer}`, { headers: {"x-access-token" : token} })
            .then(response => {
                setAnswer(response.data);
            })
            .catch(function (error) {
                setError(error.response.data.message);
                setShowModal(true);
                setErrorStatus(error.response.status);
            });
    }, [params.id, history, params.activity, params.answer, token]);

    if(!activity) {
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
                    <h1>{activity.name}</h1>
                </Row>
 
                <div key={activity._id}>
                    <h2>{activity.description}</h2>
                    <h3>Valor total: {activity.totalValue}</h3>
                    <h3>Nota: {answer?.totalGrade}</h3>

                    {activity.questions.map((question: IQuestion, index: number) => {
                        return(
                            <Card key={question._id} className="mb-3">
                                <Card.Header as="h4">{question.description}</Card.Header>
                                <Card.Body>
                                    <strong><p>Valor: {question.value}</p></strong>
                                    <strong><p>Nota: {answer?.questions[index].grade}</p></strong>
                                    
                                    <Form>
                                        {question.options.map((option: IOption) => {
                                            return(
                                                <div key={option._id}>
                                                    {
                                                        answer?.questions[index].optionID === option.id ?
                                                            <Form.Check
                                                                name={question._id}
                                                                type="radio"
                                                                label={option.value}
                                                                id={`${question._id}${option.id}`}
                                                                value={option.id}
                                                                readOnly
                                                                checked
                                                            />
                                                        :
                                                            <Form.Check
                                                                name={question._id}
                                                                type="radio"
                                                                label={option.value}
                                                                id={`${question._id}${option.id}`}
                                                                value={option.id}
                                                                disabled
                                                            />
                                                    }   
                                                </div>
                                            );
                                        })}
                                    </Form>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </div>

                <BackButton />

            </Container>

            <ModalError show={showModal} onHide={() => modalAction()} message={error} onClick={() => modalAction()}/>

        </div>
    );
}   

export default ShowAnsweredActivity;