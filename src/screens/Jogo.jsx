import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { dadosNivel } from "../mocks/dados";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import Cartao from "../components/Cartao";
import Cronometro from "../components/Cronometro";
import Sucesso from "../assets/sucesso.mp3"
import Erro from "../assets/erro.mp3"
import Encerramento from "../assets/encerramento.mp3"
import {buscarCartas} from "../services/api.js";


export default function Jogo() {
    const { nivel } = useParams();
    const [cartoes, setCartoes] = useState([])
    const itemsRef = useRef([]);
    const refCronometro = useRef(null);
    const [ultimoIndiceSelecionado, setUltimoIndiceSelecionado] = useState(undefined)
    const [acertos, setAcertos] = useState(0)
    const [erros, setErros] = useState(0)
    const [iniciou, setIniciou] = useState(false)
    const [pontuacao, setPontuacao] = useState(null)

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, cartoes.length);
    }, [cartoes]);

    useEffect(() => {
        compararNivel(nivel)
    }, [])

    useEffect(() => {
        if (iniciou)
            window.onbeforeunload = (event) => {
                event.preventDefault()
                return 'Deseja mesmo sair da página? Você vai perder o seu jogo em atividade.';
            }
    }, [iniciou])


    function compararNivel(nivel) {
        return gerarCartoes(dadosNivel[nivel].quantidadeCartas)
    }

    useEffect(() => {
        if (acertos === dadosNivel[nivel].quantidadeCartas) {
            const tempoRestante = refCronometro.current.pararCronometro()
            document.getElementById("encerramento").play()
            const total = (acertos * dadosNivel[nivel].pesoAcerto) - (erros * dadosNivel[nivel].pesoErro) + (tempoRestante * dadosNivel[nivel].bonus)
            setPontuacao(total)
        }
    }, [acertos])

    async function gerarCartoes(quantidade) {
        const cartoesPadrao = await buscarCartas()
        let cartoesEscolhidos = []
        while (cartoesEscolhidos.length !== quantidade) {
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


        while (cartoesMesclados.length !== tamanhoLista) {
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
        setIniciou(true)
        virarCartoes()
        refCronometro.current.iniciarCronometro(dadosNivel[nivel].tempoLeitura)
        setTimeout(() => {
            virarCartoes()
            bloquearCartoes()
            refCronometro.current.pararCronometro()
            refCronometro.current.iniciarCronometro(dadosNivel[nivel].tempoDesafio)
        }, dadosNivel[nivel].tempoLeitura * 1000)
    }

    async function selecionarCartao(indiceAtual) {
        setTimeout(() => {
            if (ultimoIndiceSelecionado === indiceAtual) {
                setUltimoIndiceSelecionado(undefined);
                return;
            }
            if (!isNaN(ultimoIndiceSelecionado)) {
                if (cartoes[ultimoIndiceSelecionado].icone === cartoes[indiceAtual].icone) {
                    setAcertos(a => a + 1)
                    itemsRef.current[ultimoIndiceSelecionado].alterarBloqueio();
                    itemsRef.current[indiceAtual].alterarBloqueio();
                    document.getElementById("sucesso").play()
                } else {
                    itemsRef.current[ultimoIndiceSelecionado].virarCartao();
                    itemsRef.current[indiceAtual].virarCartao();
                    setErros(e => e + 1)
                    document.getElementById("erro").play()
                }
                setUltimoIndiceSelecionado(undefined);
            } else {
                setUltimoIndiceSelecionado(indiceAtual)
            }
        }, 250)
    }

    function virarCartoes() {
        itemsRef.current.forEach(ref => {
            ref.virarCartao()
        })
    }

    function bloquearCartoes() {
        itemsRef.current.forEach(ref => {
            ref.alterarBloqueio();
        })
    }


    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="justify-content-md-center text-center">
                        <Button className="m-2" size="lg" onClick={iniciar} style={{ display: !iniciou ? 'unset' : 'none' }}>
                            <i className="bi-play"></i> Iniciar
                        </Button>
                        <Cronometro ref={el => refCronometro.current = el} />
                    </Col>
                </Row>
                <Row style={{ display: iniciou ? 'flex' : 'none', justifyContent: 'space-around' }}>
                    <Col className="justify-content-md-center text-center">
                        <div className="m-1">
                            <i className="bi-x-circle" style={{ fontSize: 20, color: "red" }}></i> <span style={{ fontSize: 20, color: "red" }}>{erros}</span>
                        </div>
                        <div className="m-1">
                            <i className="bi-check-circle" style={{ fontSize: 20, color: "green" }}></i>  <span style={{ fontSize: 20, color: "green" }}>{acertos}</span>
                        </div>
                    </Col>
                </Row>
                <Row className="p-5">
                    {cartoes.length > 0 ?
                        cartoes.map((cartao, indice) => {
                            return (
                                <Col className="p-1 d-flex justify-content-center" key={indice} >
                                    <Cartao
                                        cor={cartao.cor}
                                        icone={cartao.icone}
                                        selecionarCartao={() => selecionarCartao(indice)}
                                        ref={el => itemsRef.current[indice] = el}
                                    />
                                </Col>
                            )
                        })
                        : <Spinner />}
                </Row>

                <Modal show={pontuacao != null} centered data-bs-theme="dark">
                    <Modal.Header>
                        <Modal.Title className="text-light">Parabéns!! Você completou o desafio</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-light">
                        Você atingiu <strong> {pontuacao}</strong> pontos.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button>Abrir Ranking</Button>
                    </Modal.Footer>
                </Modal>
                <audio src={Sucesso} id="sucesso" />
                <audio src={Erro} id="erro" />
                <audio src={Encerramento} id="encerramento" />
            </Container>
        </>
    );
}