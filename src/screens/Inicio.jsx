import {useState} from "react";
import {Button, Col, Container, Row, Modal, Form} from "react-bootstrap";
import ModalDificuldade from "../components/ModalDificuldade";
import Logo from "../components/Logo";

export default function Inicio() {
    const [show, setShow] = useState(false);

    const fecharModal = () => setShow(false);
    const abrirModal = () => setShow(true);

    return (
        <Container fluid className="p-5">
            <Row className="justify-content-md-center p-5" >
                <Col className="justify-content-md-center text-center">
                    <Button className="m-2" size="lg" onClick={abrirModal}>
                        <i className="bi-dice-1-fill"></i>  Novo Jogo
                    </Button>

                    <Button href="/ranking" className="m-2" size="lg">
                        <i className="bi-trophy-fill"></i> Ranking
                    </Button>
                </Col>
            </Row>

            <Modal show={show} size="lg" onHide={fecharModal} centered animation data-bs-theme="dark">
                <ModalDificuldade />
            </Modal>
        </Container>
    );
}