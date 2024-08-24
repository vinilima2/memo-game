import {useState, useEffect, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {cartas, dadosNivel} from "../mocks/dados";
import {Button, Col, Container, Modal, Row, Spinner} from "react-bootstrap";
import Cartao from "../components/Cartao";
import Cronometro from "../components/Cronometro";
import Sucesso from "../assets/sucesso.mp3"
import Erro from "../assets/erro.mp3"
import Encerramento from "../assets/encerramento.mp3"


export default function Jogo() {
    const {nivel} = useParams();
    const navigate = useNavigate()

    const itemsRef = useRef([]);
    const refCronometro = useRef(null);

    const [cartoes, setCartoes] = useState([])
    const [ultimoIndiceSelecionado, setUltimoIndiceSelecionado] = useState(undefined)

    const [acertos, setAcertos] = useState(0)
    const [erros, setErros] = useState(0)
    const [pontuacao, setPontuacao] = useState(0)

    const [iniciou, setIniciou] = useState(false)
    const [finalizou, setFinalizou] = useState(false)

    useEffect(() => {
        if (!nivel) navigate("/inicio")
        compararNivel(nivel)
    }, [])

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, cartoes.length);
    }, [cartoes]);


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
        let tempoRestante = 0;
        if (acertos === dadosNivel[nivel].quantidadeCartas) {
            tempoRestante = refCronometro.current.pararCronometro()
            document.getElementById("encerramento").play()
            setFinalizou(true)
        }
        const total = (acertos * dadosNivel[nivel].pesoAcerto) - (erros * dadosNivel[nivel].pesoErro) + (tempoRestante * dadosNivel[nivel].bonus)
        setPontuacao(total)
    }, [acertos,])

    function gerarCartoes(quantidade) {
        const cartoesPadrao = cartas
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
        const timeoutID = setTimeout(() => {
            virarCartoes()
            bloquearCartoes()
            refCronometro.current.pararCronometro()
            refCronometro.current.iniciarCronometro(dadosNivel[nivel].tempoDesafio)
            clearTimeout(timeoutID)
        }, dadosNivel[nivel].tempoLeitura * 1000)
    }

    async function selecionarCartao(indiceAtual) {
        const timeoutID = setTimeout(() => {
            if (ultimoIndiceSelecionado === indiceAtual) {
                itemsRef.current[indiceAtual].virarCartao();
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
            clearTimeout(timeoutID)
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
                        <Button className="m-2" size="lg" onClick={iniciar}
                                style={{display: !iniciou ? 'unset' : 'none'}}>
                            <i className="bi-play"></i> Iniciar
                        </Button>
                        <Cronometro ref={el => refCronometro.current = el}/>
                    </Col>
                </Row>
                <Row style={{display: iniciou ? 'flex' : 'none', justifyContent: 'center'}}>
                    <Col className="text-center  m-1" md="1" lg="1" sm="1">
                        <i className="bi-x-circle text-danger h6"></i> <span className="text-danger h6">{erros}</span>
                    </Col>
                    <Col className="text-center m-1" md="1" lg="1" sm="1">
                        <i className="bi-check-circle text-success h6"></i> <span
                        className="text-success h6">{acertos}</span>
                    </Col>
                    <Col className="text-center m-1" md="1" lg="1" sm="1">
                        <i className="bi-trophy-fill text-info h6"></i> <span
                        className="text-info h6">{pontuacao}</span>
                    </Col>
                </Row>
                <Row className="p-5">
                    {cartoes.length > 0 ?
                        cartoes.map((cartao, indice) => {
                            return (
                                <Col className="p-1 d-flex justify-content-center" key={indice}>
                                    <Cartao
                                        cor={cartao.cor}
                                        icone={cartao.icone}
                                        selecionarCartao={() => selecionarCartao(indice)}
                                        ref={el => itemsRef.current[indice] = el}
                                    />
                                </Col>
                            )
                        })
                        : <Spinner/>}
                </Row>

                <Modal show={finalizou} centered data-bs-theme="dark">
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
                <audio src={Sucesso} id="sucesso"/>
                <audio src={Erro} id="erro"/>
                <audio src={Encerramento} id="encerramento"/>
            </Container>
        </>
    );
}