import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function BackButton(){

    const { goBack } = useHistory();

    return (
        <div className="buttonDiv">
            <Button variant="danger" onClick={goBack}>Voltar</Button>
        </div>
    )
}