import {forwardRef, useImperativeHandle, useState} from "react";

const Cartao = forwardRef(function (props, ref) {
    const {icone, cor, selecionarCartao} = props;
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
        <div ref={r => ref.current = r} onClick={selecionar} className={"text-center align-items-center flip"}>
            {
                <i className={`icon bi-${exibir ? icone : 'question-circle'}`}
                   style={{color: exibir ? cor : 'gray'}}></i>
            }
        </div>
    );
})
export default Cartao;