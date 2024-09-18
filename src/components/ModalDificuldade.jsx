import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ModalDificuldade() {
    const navigate = useNavigate();

    function navegarParaJogo(nivel) {
        navigate(`/jogo/${nivel}`)
    }

    return (
        <>
            <Modal.Header>
                <Modal.Title className="text-light">Selecione a dificuldade</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="justify-content-space-around">
                        <div className="d-grid gap-2">

                            <Button size="lg" variant="success" onClick={() => navegarParaJogo('facil')}>
                                <i className="bi-reception-1"></i> Fácil
                            </Button>


                            <Button size="lg" variant="warning" onClick={() => navegarParaJogo('medio')}>
                                <i className="bi-reception-2"></i> Médio
                            </Button>


                            <Button size="lg" variant="danger" onClick={() => navegarParaJogo('dificil')}>
                                <i className="bi-reception-4"></i> Difícil
                            </Button>

                        </div>
                    </Row>
                </Container>
            </Modal.Body>
        </>
    );
}