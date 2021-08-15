import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CustomNavbar from '../../components/Navbar';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import ModalError from '../../components/ModalError';
import ModalSuccess from '../../components/ModalSucess';

interface SubjectParams {
    id: string;
    activity: string;
};

function ShowActivityStudent () {

    const baseUrl: string = "http://localhost:3000";
    const history = useHistory();
    const token = localStorage.getItem('x-access-token');

    const [showModalError, setShowModalError] = useState(false);
    const [errorStatus, setErrorStatus] = useState(Number);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState<any>([]);

    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [validated, setValidated] = useState(false);

    const params = useParams<SubjectParams>();
    const [activity, setActivity] = useState<IActivity>();

    const [question0_id, setQuestion0_id] = useState('');
    const [question0_answer, setQuestion0_answer] = useState('');

    const [question1_answer, setQuestion1_answer] = useState('');
    const [question1_id, setQuestion1_id] = useState('');

    const [question2_answer, setQuestion2_answer] = useState('');
    const [question2_id, setQuestion2_id] = useState('');

    const [question3_answer, setQuestion3_answer] = useState('');
    const [question3_id, setQuestion3_id] = useState('');

    const [question4_answer, setQuestion4_answer] = useState('');
    const [question4_id, setQuestion4_id] = useState('');

    function modalAction(){
        if(errorStatus === 401){
            return history.push('/');
        } else {
            return setShowModalError(false);
        }
    }

    function handleQuestionAnswer(value: any, question_id: any, index: number){
        switch(index){
            case 0:
                setQuestion0_answer(value);
                setQuestion0_id(question_id);
                break;
            case 1:
                setQuestion1_answer(value);
                setQuestion1_id(question_id);
                break;
            case 2:
                setQuestion2_answer(value);
                setQuestion2_id(question_id);
                break;
            case 3:
                setQuestion3_answer(value);
                setQuestion3_id(question_id);
                break;
            case 4:
                setQuestion4_answer(value);
                setQuestion4_id(question_id);
                break;
        }
    }

    async function addAnswer(event: any) {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } 

        setValidated(true);

        if (form.checkValidity() === true){
            var data = new FormData();
            data.append('question0_answer', question0_answer);
            data.append('question1_answer', question1_answer);
            data.append('question2_answer', question2_answer);
            data.append('question3_answer', question3_answer);
            data.append('question4_answer', question4_answer);

            data.append('question0_id', question0_id);
            data.append('question1_id', question1_id);
            data.append('question2_id', question2_id);
            data.append('question3_id', question3_id);
            data.append('question4_id', question4_id);

            var formData = JSON.stringify(Object.fromEntries(data.entries()));
            formData = JSON.parse(formData);

            try {
                const response = await axios.post(`${baseUrl}/addAnswer/${params.id}/${params.activity}`, formData, { headers: {"x-access-token" : token} });
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
        
    }

    useEffect(() => {
        axios.get(`${baseUrl}/showActivity/${params.id}/${params.activity}`, { headers: {"x-access-token" : token} })
            .then(response => {
                setActivity(response.data);
            })
            .catch(function (error) {
                if(error.response.status === 400){
                    setErrors(error.response.data.errors);
                }  else {
                    setError(error.response.data.message);
                    setShowModalError(true);
                    setErrorStatus(error.response.status);
                }
            })
    }, [params.id, params.activity, token]);


    if(!activity) {
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
                    <h1>{activity.name}</h1>
                </Row>

                <div key={activity._id}>
                    <h2>{activity.description}</h2>
                    <h3>Valor total: {activity.totalValue}</h3>

                    <Form noValidate validated={validated} method="POST" onSubmit={addAnswer}>
                        {activity.questions.map((question: IQuestion, index: number) => {
                            return(
                                <Card key={question._id} className="mb-3">
                                    <Card.Header as="h4">{question.description}</Card.Header>
                                    <Card.Body>
                                        <strong><p>Valor: {question.value}</p></strong>
                                            <Form.Group>
                                                {question.options.map((option: IOption) => {
                                                    return(
                                                        <div key={option._id}>
                                                            <Form.Check
                                                                required
                                                                name={question._id}
                                                                type="radio"
                                                                label={option.value}
                                                                id={`${question._id}${option.id}`}
                                                                value={option.id}
                                                                onChange={event => handleQuestionAnswer(event.target.value, question._id, index)}
                                                                isInvalid={errors[`questions.${index}.optionID`]}
                                                                feedback="Por favor selecione uma opção."
                                                            />  
                                                        </div>
                                                    );
                                                })}
                                            </Form.Group>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                        <Button variant="primary" type="submit">
                            Responder
                        </Button>
                    
                    </Form>                        
                </div>

                <BackButton />

            </Container>

            <ModalError show={showModalError} onHide={() => modalAction()} message={error} onClick={() => modalAction()}/>
            <ModalSuccess show={showModalSuccess} onHide={() => history.push(`/subjectStudent/${params.id}`)} message={successMessage} onClick={() => history.push(`/subjectStudent/${params.id}`)}/>

        </div>
    );
}   

export default ShowActivityStudent;