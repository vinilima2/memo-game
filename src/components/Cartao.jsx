import { forwardRef, useImperativeHandle, useState } from "react";
import { Card } from "react-bootstrap";

const Cartao = forwardRef(function (props, ref) {
    const { icone, cor, selecionarCartao } = props;
    const [exibir, setExibir] = useState(false)
    const [bloquear, setBloquear] = useState(true)

    useImperativeHandle(ref, () => ({
        virarCartao,
        alterarBloqueio
    }))

    function selecionar() {
        if (bloquear) return;
        virarCartao()
        selecionarCartao()
    }

    function alterarBloqueio() {
        setBloquear(!bloquear)
    }

    function virarCartao() {
        setExibir(!exibir)
        alterarCSS()
    }


    function alterarCSS() {
        if (ref.current.style.transform === 'rotateY(180deg)') {
            ref.current.style.transform = 'rotateY(0deg)';
        } else {
            ref.current.style.transform = 'rotateY(180deg)';
        }
    }


    return (
        <Card ref={r => ref.current = r} onClick={selecionar} className={"text-center align-items-center flip"} >
            <Card.Body>
                {
                    <i className={`icon bi-${exibir ? icone : 'question-circle'}`} style={{ color: exibir ? cor : 'gray' }}></i>
                }
            </Card.Body>
        </Card>
    );
})
export default Cartao;