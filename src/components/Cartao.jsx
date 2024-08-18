import { forwardRef, useImperativeHandle, useState } from "react";
import { Card } from "react-bootstrap";

const Cartao = forwardRef(function Cartao(props, ref) {
    const { icone, cor, selecionarCartao } = props;
    const [exibir, setExibir] = useState(false)
    const [bloquear, setBloquear] = useState(false)

    function selecionar() {
        if (bloquear) return;
        virarCartao()
        selecionarCartao(icone)
    }

    function alterarBloqueio() {
        setBloquear(!bloquear)
    }

    function virarCartao() {
        ref.current.classList.toggle('flip')
        setTimeout(() => {
            setExibir(!exibir)
            ref.current.classList.toggle('flip')
        }, 500)
    }

    useImperativeHandle(ref, () => ({
        virarCartao
    }))


    return (
        <Card ref={r => ref.current = r} onClick={selecionar} style={{ height: '200px', width: '200px' }} className={"text-center"} >
            <Card.Body>
                {
                    <i className={`bi-${exibir ? icone : 'question-circle'}`} style={{ color: exibir ? cor : 'gray', fontSize: 120 }}></i>
                }
            </Card.Body>
        </Card>
    );
})
export default Cartao;