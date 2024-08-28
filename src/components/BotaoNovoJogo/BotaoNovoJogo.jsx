import { Modal } from 'react-bootstrap';
import './BotaoNovoJogo.css';
import { useState } from 'react';
import ModalDificuldade from '../ModalDificuldade';

const BotaoNovoJogo = () => {
    const [show, setShow] = useState(false);
    const fecharModal = () => setShow(false);
    const abrirModal = () => setShow(true);

    return (
        <>

        <a onClick={abrirModal} className="botao-novo-jogo" title='Novo Jogo'>
            <i className="big-icon bi bi-plus-circle h2"/>
            <i className="small-icon bi bi-plus-circle h4"/>
        </a>

        <Modal show={show} size="lg" onHide={fecharModal} centered animation data-bs-theme="dark">
            <ModalDificuldade />
        </Modal>
        </>
    );
}

export default BotaoNovoJogo;