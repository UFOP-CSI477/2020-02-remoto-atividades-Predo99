import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import ModalError from "../../components/ModalError";
import CustomNavbar from "../../components/Navbar";

function Profile () {

    const baseUrl: string = "http://localhost:3000";
    const token = localStorage.getItem('x-access-token');
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');

    const [user, setUser] = useState<IUser>();
    const [teacher, setTeacher] = useState<ITeacher>();

    const [teacherSubject, setTeacherSubject] = useState<ISubject>();
    const [studentSubjects, setStudentSubjects] = useState<IStudentSubject[]>([]);

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    function buildSubject(subject: ISubject){
        return (
            <div key={subject._id}>
                <p><strong>Matéria: </strong></p>
                <p>Nome: {subject.subjectName}</p>
                <p>Descrição: {subject.subjectDescription}</p>
                <p>Quantidade de alunos: {subject.students}</p>
            </div>
        )
    }

    function showSubjects(){
        if(userType === "student"){
            if(studentSubjects != null){
                var approved = 0;
                var reproved = 0;
                var studying = 0;
                var total = studentSubjects.length;

                studentSubjects.forEach(subject => {
                    if(subject.situation === "Aprovado"){
                        approved++;
                    } else if(subject.situation === "Reprovado"){
                        reproved++;
                    } else {
                        studying++;
                    }
                });

                return(
                    <div>
                        <p><strong>Matérias:</strong></p>
                        <ul>
                            <li><p>Matérias matriculadas: {total}</p></li>
                            <li><p>Matérias cursando: {studying} - {Math.round(studying/total * 100 * 100) / 100}%</p></li>
                            <li><p>Matérias aprovadas: {approved} - {Math.round(approved/total * 100 * 100) / 100}%</p></li>
                            <li><p>Matérias reprovadas: {reproved} - {Math.round(reproved/total * 100 * 100) / 100}%</p></li>
                        </ul>
                    </div>
                );
            }
        } else {
            if(teacherSubject != null){
                return (
                    <div>
                        {buildSubject(teacherSubject)}
                    </div>
                )
            }   
        }
    }

    useEffect(() => {
        axios.get(`${baseUrl}/getUser`, { headers: {"x-access-token" : token} })
            .then(response => {
                setUser(response.data);
            })
            .catch(function (error) {
                setError(error.response.data.message);
                setShowModal(true);
            });

        if(userType === "student"){
            axios.get(`${baseUrl}/student/${userId}`, { headers: {"x-access-token" : token} }).then(response => {
                setStudentSubjects(response.data.subjects);
            }).catch(function (error) {
                setError(error.response.data.message);
                setShowModal(true);
            }); 
        } else {
            axios.get(`${baseUrl}/teacher/${userId}`, { headers: {"x-access-token" : token} }).then(response => {
                setTeacher(response.data);
            }).catch(function (error) {
                setError(error.response.data.message);
                setShowModal(true);
            }); 
            axios.get(`${baseUrl}/teacherSubject`, { headers: {"x-access-token" : token} }).then(response => {
                setTeacherSubject(response.data);
            }).catch(function (error) {
                setError(error.response.data.message);
                setShowModal(true);
            }); 
        }   

    }, [token, userId, userType]);

    return (
        <div>
            <CustomNavbar />

                <Container className="body">
                    <Row className="text-center">
                        <h1>Perfil</h1>
                    </Row>

                    <Card className="mb-3">
                        <Card.Header as="h2" className="text-center">{user?.name}</Card.Header>
                        <Card.Body>
                            <Card.Text><strong>Email: </strong>{user?.email}</Card.Text>

                            {
                                userType === "teacher" ?
                                    <Card.Text><strong>Descrição: </strong>{teacher?.description}</Card.Text>
                                :
                                    ""
                            }

                            {showSubjects()}

                        </Card.Body>
                        <Card.Footer>
                            {
                                userType === "student" ?
                                    <Button variant="warning" href={`/editStudent/${userId}`}>Editar</Button>
                                :
                                    <Button variant="warning" href={`/editTeacher/${userId}`}>Editar</Button>
                            }
                        </Card.Footer>
                    </Card>

                    <ModalError show={showModal} onHide={() => setShowModal(false)} message={error} onClick={() => setShowModal(false)}/>
                </Container>
        </div>
    )
}

export default Profile;