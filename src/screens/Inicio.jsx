import React, { useState } from 'react';
import { Button, Col, Container, Row, Modal } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import ModalDificuldade from '../components/ModalDificuldade';
import Logo from '../components/Logo';

export default function Inicio() {
    const [show, setShow] = useState(false);

    const fecharModal = () => setShow(false);
    const abrirModal = () => setShow(true);

    return (
        <Container fluid className="p-5 d-flex flex-column align-items-center">
            <Logo style={{ marginTop: '3rem' }} />
            <Row className="justify-content-center" style={{ marginTop: '3rem' }}>

                
                <Col xs="auto" className="text-center">
                    <Button
                        className="m-2 d-flex align-items-center px-4 py-2 rounded shadow-sm"
                        size="lg"
                        onClick={abrirModal}
                        variant="primary"
                    >
                        <i className="bi bi-plus-circle-fill me-2"></i>
                        Novo Jogo
                    </Button>

                    <Button
                        href="/ranking"
                        className="m-2 d-flex align-items-center px-4 py-2 rounded shadow-sm"
                        size="lg"
                        variant="secondary"
                    >
                        <i className="bi bi-trophy-fill me-2"></i>
                        Ranking
                    </Button>
                </Col>
            </Row>

            <Modal show={show} size="lg" onHide={fecharModal} centered animation data-bs-theme="dark">
                <ModalDificuldade />
            </Modal>
        </Container>
    );
}
