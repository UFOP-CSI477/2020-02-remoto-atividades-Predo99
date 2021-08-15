import { Button, Modal } from "react-bootstrap";

export default function ModalDelete(props: any){
    return (
        <div>
            <Modal {...props} size="lg">
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tem certeza que deseja realizar a exclusão?
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Essa é uma operação irreversível!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onYes}>
                        Excluir
                    </Button>
                    <Button variant="secondary" onClick={props.onClose}>
                        Voltar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}