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
                <Modal.Title>Selecione a dificuldade</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <Button className="m-2" size="md" variant="success" onClick={() => navegarParaJogo('facil')}>
                                <i className="bi-reception-1"></i> Fácil
                            </Button>
                        </Col>
                        <Col>
                            <Button className="m-2" size="md" variant="warning" onClick={() => navegarParaJogo('medio')}>
                                <i className="bi-reception-2"></i> Médio
                            </Button>
                        </Col>
                        <Col>
                            <Button className="m-2" size="md" variant="danger" onClick={() => navegarParaJogo('dificil')}>
                                <i className="bi-reception-4"></i> Difícil
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </>
    );
}