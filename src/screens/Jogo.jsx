import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { cartas } from "../mocks/dados";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import Cartao from "../components/Cartao";



export default function Jogo() {
    let { nivel } = useParams();
    const [cartoes, setCartoes] = useState([])
    const [cartoesSelecionados, setCartoesSelecionados] = useState([])
    const [acertos, setAcertos] = useState(0)
    const [erros, setErros] = useState(0)
    const itemsRef = useRef([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, cartoes.length);
    }, [cartoes]);

    useEffect(() => {
        compararNivel(nivel)
    }, [])

    function compararNivel(nivel) {
        if (nivel == 'facil') {
            return gerarCartoes(3)
        } else if (nivel == 'medio') {
            return gerarCartoes(6)
        } else if (nivel == 'dificil') {
            return gerarCartoes(9)
        }
        throw new Error('Nenhum valor de nivel informado')
    }

    function gerarCartoes(quantidade) {
        const cartoesPadrao = cartas
        let cartoesEscolhidos = []
        while (cartoesEscolhidos.length != quantidade) {
            let posicao = Math.floor((Math.random() * cartoesPadrao.length) + 1)
            let cartaoEscolhido = cartoesPadrao[posicao]
            if (cartaoEscolhido) {
                cartoesEscolhidos.push(cartaoEscolhido)
                cartoesPadrao.splice(posicao, 1)
            }
        }
        misturarCartas(cartoesEscolhidos)
    }

    function misturarCartas(cartoes) {
        let cartoesDuplicados = cartoes.concat(cartoes)
        const tamanhoLista = cartoesDuplicados.length
        let cartoesMesclados = []


        while (cartoesMesclados.length != tamanhoLista) {
            let posicao = Math.floor((Math.random() * cartoesDuplicados.length))
            let cartao = cartoesDuplicados[posicao]
            if (cartao) {
                cartoesMesclados.push(cartao)
                cartoesDuplicados.splice(posicao, 1)
            }
        }
        setCartoes(cartoesMesclados)
    }


    function iniciar() {
        alterarStatusCartoes()
        setTimeout(() => { alterarStatusCartoes() }, 10000)
    }

    function selecionarCartao(icone) {
        if (cartoesSelecionados.length == 1) {
            if (cartoesSelecionados[0] == icone) {
                setAcertos(a => a + 1)
            } else {
                setErros(e => e + 1)
            }
            setCartoesSelecionados([])
        } else {
            setCartoesSelecionados([icone])
        }
    }

    function alterarStatusCartoes() {
        itemsRef.current.forEach(ref => (ref.virarCartao()))
    }


    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="justify-content-md-center text-center">
                        <Button className="m-2" size="lg" onClick={() => iniciar()}>
                            <i className="bi-play"></i>  Iniciar
                        </Button>
                    </Col>
                </Row>
                <Row className="p-5">
                    {cartoes.length > 0 ?
                        cartoes.map((cartao, indice) => {
                            return (
                                <Col className="p-1" key={indice} >
                                    <Cartao
                                        cor={cartao.cor}
                                        icone={cartao.icone}
                                        selecionarCartao={selecionarCartao}
                                        ref={el => itemsRef.current[indice] = el}
                                    />
                                </Col>
                            )
                        })
                        : <Spinner />}
                </Row>
                <Row>
                    <Col className="justify-content-md-center text-center">
                        <Col>
                            <i className="bi-x-circle" style={{ fontSize: 20, color: "red" }}></i> <span style={{ fontSize: 20, color: "red" }}>{erros}</span>
                        </Col>
                        <Col>
                            <i className="bi-check-circle" style={{ fontSize: 20, color: "green" }}></i>  <span style={{ fontSize: 20, color: "green" }}>{acertos}</span>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </>
    );
}