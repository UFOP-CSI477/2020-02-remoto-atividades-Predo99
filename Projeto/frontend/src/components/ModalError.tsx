import { Button, Modal } from "react-bootstrap";

export default function ModalError(props: any){
    return (
        <div>
            <Modal {...props} size="lg">
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Ops, aconteceu algum erro!
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{props.message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" {...props.onClick}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}