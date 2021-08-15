import { Container, Spinner } from "react-bootstrap";

export default function Loading(){

    return (
        <Container className="text-center justify-content-center">
            <h1>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </Spinner>
                Carregando...
            </h1>
            
        </Container>
    )
}