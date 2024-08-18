import React, { useState } from "react";
import { Button, Col, Container, Row, Image, Modal, Form } from "react-bootstrap";
import ModalDificuldade from "../components/ModalDificuldade";
import Logo from "../components/Logo";

export default function Inicio() {
    const [show, setShow] = useState(false);

    const fecharModal = () => setShow(false);
    const abrirModal = () => setShow(true);

    return (
        <Container fluid className="p-5">
            <Row className="justify-content-md-center text-center p-5 bg-blue">
                <Col>
                    <Logo/>
                </Col>
            </Row>
            <Row className="justify-content-md-center text-center p-5">
                <Col md="auto">
                     <Form.Control aria-label="First name" placeholder="Nome do usuário" />
                </Col>
            </Row>
            <Row className="justify-content-md-center p-5" >
                <Col className="justify-content-md-center text-center">
                    <Button className="m-2" size="lg" onClick={abrirModal}>
                        <i className="bi-dice-1-fill"></i>  Novo Jogo
                    </Button>

                    <Button className="m-2" size="lg">
                        <i className="bi-trophy-fill"></i> Ranking
                    </Button>
                </Col>
            </Row>

            <Modal show={show} onHide={fecharModal} centered>
                <ModalDificuldade />
            </Modal>
        </Container>
    );
}