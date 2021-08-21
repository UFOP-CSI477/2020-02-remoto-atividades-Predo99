import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import { useHistory, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import ModalError from '../../components/ModalError';
import ModalSuccess from '../../components/ModalSucess';
import CustomNavbar from '../../components/Navbar';

interface SubjectParams {
    id: string;
};

function AddActivity () {

    const baseUrl: string = "http://localhost:3000";
    const token = localStorage.getItem('x-access-token');
    const params = useParams<SubjectParams>();
    const history = useHistory();

    const [showModalError, setShowModalError] = useState(false);
    const [errorStatus, setErrorStatus] = useState(Number);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState<any>([]);

    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [validated, setValidated] = useState(false);

    function modalAction(){
        if(errorStatus === 401){
            return history.push('/');
        } else {
            return setShowModalError(false);
        }
    }

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [question0_description, setQuestion0_description] = useState('');
    const [question0_option0, setQuestion0_option0] = useState('');
    const [question0_option1, setQuestion0_option1] = useState('');
    const [question0_option2, setQuestion0_option2] = useState('');
    const [question0_option3, setQuestion0_option3] = useState('');
    const [question0_option4, setQuestion0_option4] = useState('');
    const [question0_answer, setQuestion0_answer] = useState('');
    const [question0_value, setQuestion0_value] = useState('');

    const [question1_description, setQuestion1_description] = useState('');
    const [question1_option0, setQuestion1_option0] = useState('');
    const [question1_option1, setQuestion1_option1] = useState('');
    const [question1_option2, setQuestion1_option2] = useState('');
    const [question1_option3, setQuestion1_option3] = useState('');
    const [question1_option4, setQuestion1_option4] = useState('');
    const [question1_answer, setQuestion1_answer] = useState('');
    const [question1_value, setQuestion1_value] = useState('');

    const [question2_description, setQuestion2_description] = useState('');
    const [question2_option0, setQuestion2_option0] = useState('');
    const [question2_option1, setQuestion2_option1] = useState('');
    const [question2_option2, setQuestion2_option2] = useState('');
    const [question2_option3, setQuestion2_option3] = useState('');
    const [question2_option4, setQuestion2_option4] = useState('');
    const [question2_answer, setQuestion2_answer] = useState('');
    const [question2_value, setQuestion2_value] = useState('');

    const [question3_description, setQuestion3_description] = useState('');
    const [question3_option0, setQuestion3_option0] = useState('');
    const [question3_option1, setQuestion3_option1] = useState('');
    const [question3_option2, setQuestion3_option2] = useState('');
    const [question3_option3, setQuestion3_option3] = useState('');
    const [question3_option4, setQuestion3_option4] = useState('');
    const [question3_answer, setQuestion3_answer] = useState('');
    const [question3_value, setQuestion3_value] = useState('');

    const [question4_description, setQuestion4_description] = useState('');
    const [question4_option0, setQuestion4_option0] = useState('');
    const [question4_option1, setQuestion4_option1] = useState('');
    const [question4_option2, setQuestion4_option2] = useState('');
    const [question4_option3, setQuestion4_option3] = useState('');
    const [question4_option4, setQuestion4_option4] = useState('');
    const [question4_answer, setQuestion4_answer] = useState('');
    const [question4_value, setQuestion4_value] = useState('');

    function handleQuestionDescription(index: number, value: any){
        switch(index){
            case 0:
                setQuestion0_description(value);
                break;
            case 1:
                setQuestion1_description(value);
                break;
            case 2:
                setQuestion2_description(value);
                break;
            case 3:
                setQuestion3_description(value);
                break;
            case 4:
                setQuestion4_description(value);
                break;
        }
    }

    function handleQuestionOptions(index: number, j: number, value: any){
        switch(index){
            case 0:
                switch(j){
                    case 0:
                        setQuestion0_option0(value);
                        break;
                    case 1:
                        setQuestion0_option1(value);
                        break;
                    case 2:
                        setQuestion0_option2(value);
                        break;
                    case 3:
                        setQuestion0_option3(value);
                        break;
                    case 4:
                        setQuestion0_option4(value);
                        break;
                }
                break;
            case 1:
                switch(j){
                    case 0:
                        setQuestion1_option0(value);
                        break;
                    case 1:
                        setQuestion1_option1(value);
                        break;
                    case 2:
                        setQuestion1_option2(value);
                        break;
                    case 3:
                        setQuestion1_option3(value);
                        break;
                    case 4:
                        setQuestion1_option4(value);
                        break;
                }
                break;
            case 2:
                switch(j){
                    case 0:
                        setQuestion2_option0(value);
                        break;
                    case 1:
                        setQuestion2_option1(value);
                        break;
                    case 2:
                        setQuestion2_option2(value);
                        break;
                    case 3:
                        setQuestion2_option3(value);
                        break;
                    case 4:
                        setQuestion2_option4(value);
                        break;
                }
                break;
            case 3:
                switch(j){
                    case 0:
                        setQuestion3_option0(value);
                        break;
                    case 1:
                        setQuestion3_option1(value);
                        break;
                    case 2:
                        setQuestion3_option2(value);
                        break;
                    case 3:
                        setQuestion3_option3(value);
                        break;
                    case 4:
                        setQuestion3_option4(value);
                        break;
                }
                break;
            case 4:
                switch(j){
                    case 0:
                        setQuestion4_option0(value);
                        break;
                    case 1:
                        setQuestion4_option1(value);
                        break;
                    case 2:
                        setQuestion4_option2(value);
                        break;
                    case 3:
                        setQuestion4_option3(value);
                        break;
                    case 4:
                        setQuestion4_option4(value);
                        break;
                }
                break;
        }
    }

    function handleQuestionValue(index: number, value: any){
        switch(index){
            case 0:
                setQuestion0_value(value);
                break;
            case 1:
                setQuestion1_value(value);
                break;
            case 2:
                setQuestion2_value(value);
                break;
            case 3:
                setQuestion3_value(value);
                break;
            case 4:
                setQuestion4_value(value);
                break;
        }
    }

    function handleQuestionAnswer(index: number, value: any){
        switch(index){
            case 0:
                setQuestion0_answer(value);
                break;
            case 1:
                setQuestion1_answer(value);
                break;
            case 2:
                setQuestion2_answer(value);
                break;
            case 3:
                setQuestion3_answer(value);
                break;
            case 4:
                setQuestion4_answer(value);
                break;
        }
    }

    function buildQuestions(){
        var questions:any = [];

        for (let i = 0; i < 5; i++) {
            questions.push(buildQuestion(i));
        }

        return(
            <div>
                {questions}
            </div>
        );  
    }

    function buildOptions(index: number){
        var options:any = [];

        for (let j = 0; j < 5; j++) {
            options.push(buildOption(index, j));
        }

        return(
            <div>{options}</div>
        );
    }

    function buildOption(index: number, j: number){
        return (
            <div key={`questions.${index}.options.${j}.value`}>
                <Form.Group className="mb-3" controlId={`questions.${index}.options.${j}.value`}>
                    <Form.Label>Descrição da opção {j+1}</Form.Label>
                    <Form.Control required type="text" placeholder={`Digite a opção ${j+1}`} onChange={event => handleQuestionOptions(index, j, event.target.value)} isInvalid={errors[`questions.${index}.options.${j}.value`]}/>

                    <Form.Control.Feedback type="invalid">
                        {
                            errors[`questions.${index}.options.${j}.value`] ? 
                                <p>{errors[`questions.${index}.options.${j}.value`].message}</p>
                            :   
                                <p>Por favor digite a opção.</p>
                        }
                    </Form.Control.Feedback>
                </Form.Group>
            </div>
        )
    }

    function buildQuestion(index: number){
        return(
            <div key={`question${index}`}>
                <Card className="mb-3">
                    <Card.Header as="h3">Questão {index+1}</Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3" controlId={`questions.${index}.description`}>
                            <Form.Label>Descrição da questão {index+1}</Form.Label>
                            <Form.Control required type="text" placeholder={`Digite a descrição da questão ${index+1}`} 
                                            onChange={event => handleQuestionDescription(index, event.target.value)} 
                                            isInvalid={errors[`questions.${index}.description`]}/>
                            <Form.Control.Feedback type="invalid">
                                {
                                    errors[`questions.${index}.description`] ? 
                                        <p>{errors[`questions.${index}.description`].message}</p>
                                    :   
                                        <p>Por favor digite uma descrição.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        {buildOptions(index)}

                        <Form.Group className="mb-3" controlId={`questions.${index}.value`}>
                            <Form.Label>Valor da questão</Form.Label>
                            <Form.Control required type="text" placeholder="Digite o valor da questão" 
                                            onChange={event => handleQuestionValue(index, event.target.value)} 
                                            isInvalid={errors[`questions.${index}.value`]}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors[`questions.${index}.value`] ? 
                                        <p>{errors[`questions.${index}.value`].message}</p>
                                    :   
                                        <p>Por favor digite um valor.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div>
                            <Form.Label>Resposta</Form.Label>

                            <Form.Check
                                required
                                feedback="Por favor selecione uma resposta."
                                isInvalid={errors[`questions.${index}.answer`]}
                                name={`question${index}_answer`}
                                type="radio"
                                label="Opção 1"
                                id={`question${index}_option0_answer`}
                                value="0"
                                onChange={event => handleQuestionAnswer(index, event.target.value)}
                            />

                            <Form.Check
                                required
                                feedback="Por favor selecione uma resposta."
                                isInvalid={errors[`questions.${index}.answer`]}
                                name={`question${index}_answer`}
                                type="radio"
                                label="Opção 2"
                                id={`question${index}_option1_answer`}
                                value="1"
                                onChange={event => handleQuestionAnswer(index, event.target.value)}
                            />

                            <Form.Check
                                required
                                feedback="Por favor selecione uma resposta."
                                isInvalid={errors[`questions.${index}.answer`]}
                                name={`question${index}_answer`}
                                type="radio"
                                label="Opção 3"
                                id={`question${index}_option2_answer`}
                                value="2"
                                onChange={event => handleQuestionAnswer(index, event.target.value)}
                            />

                            <Form.Check
                                required
                                feedback="Por favor selecione uma resposta."
                                isInvalid={errors[`questions.${index}.answer`]}
                                name={`question${index}_answer`}
                                type="radio"
                                label="Opção 4"
                                id={`question${index}_option3_answer`}
                                value="3"
                                onChange={event => handleQuestionAnswer(index, event.target.value)}
                            />

                            <Form.Check
                                required
                                feedback="Por favor selecione uma resposta."
                                isInvalid={errors[`questions.${index}.answer`]}
                                name={`question${index}_answer`}
                                type="radio"
                                label="Opção 5"
                                id={`question${index}_option4_answer`}
                                value="4"
                                onChange={event => handleQuestionAnswer(index, event.target.value)}
                            />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    async function addActivity(event: any) {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } 

        setValidated(true);

        if (form.checkValidity() === true){
            var data = new FormData();
            data.append('name', name);
            data.append('description', description);

            data.append('question0_description', question0_description);

            data.append('question0_option0', question0_option0);
            data.append('question0_option1', question0_option1);
            data.append('question0_option2', question0_option2);
            data.append('question0_option3', question0_option3);
            data.append('question0_option4', question0_option4);
            data.append('question0_answer', question0_answer);
            data.append('question0_value', question0_value);

            data.append('question1_description', question1_description);
            data.append('question1_option0', question1_option0);
            data.append('question1_option1', question1_option1);
            data.append('question1_option2', question1_option2);
            data.append('question1_option3', question1_option3);
            data.append('question1_option4', question1_option4);
            data.append('question1_answer', question1_answer);
            data.append('question1_value', question1_value);

            data.append('question2_description', question2_description);
            data.append('question2_option0', question2_option0);
            data.append('question2_option1', question2_option1);
            data.append('question2_option2', question2_option2);
            data.append('question2_option3', question2_option3);
            data.append('question2_option4', question2_option4);
            data.append('question2_answer', question2_answer);
            data.append('question2_value', question2_value);

            data.append('question3_description', question3_description);
            data.append('question3_option0', question3_option0);
            data.append('question3_option1', question3_option1);
            data.append('question3_option2', question3_option2);
            data.append('question3_option3', question3_option3);
            data.append('question3_option4', question3_option4);
            data.append('question3_answer', question3_answer);
            data.append('question3_value', question3_value);

            data.append('question4_description', question4_description);
            data.append('question4_option0', question4_option0);
            data.append('question4_option1', question4_option1);
            data.append('question4_option2', question4_option2);
            data.append('question4_option3', question4_option3);
            data.append('question4_option4', question4_option4);
            data.append('question4_answer', question4_answer);
            data.append('question4_value', question4_value);

            var formData = JSON.stringify(Object.fromEntries(data.entries()));
            formData = JSON.parse(formData);

            try {
                const response = await axios.post(`${baseUrl}/addActivity/${params.id}`, formData, { headers: {"x-access-token" : token} });
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

    return (
        <div>
            <CustomNavbar />

            <Container className="body">
                <Row className="text-center">
                    <h1>Adicionar atividade</h1>
                </Row>

                <Row>
                    <Form noValidate validated={validated} method="POST" onSubmit={addActivity}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control required type="text" placeholder="Digite o nome da atividade" onChange={event => setName(event.target.value)} isInvalid={errors['name']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['name'] ? 
                                        <p>{errors['name'].message}</p>
                                    :   
                                        <p>Por favor digite um nome.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control required type="text" placeholder="Digite a descrição da atividade" onChange={event => setDescription(event.target.value)} isInvalid={errors['description']}/>

                            <Form.Control.Feedback type="invalid">
                                {
                                    errors['description'] ? 
                                        <p>{errors['description'].message}</p>
                                    :   
                                        <p>Por favor digite uma descrição.</p>
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <h2>Questões</h2>

                        {buildQuestions()}

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

export default AddActivity;