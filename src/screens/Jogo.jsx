import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cartas, dadosNivel } from "../mocks/dados";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import Cartao from "../components/Cartao";
import "../Jogo.css";
import Sucesso from "../assets/sucesso.mp3";
import Erro from "../assets/erro.mp3";
import Encerramento from "../assets/encerramento.mp3";

const Cronometro = forwardRef(function Cronometro(props, ref) {
    const [segundos, setSegundos] = useState(null);
    const [intervalo, setIntervalo] = useState(null);

    useEffect(() => {
        if (segundos <= 0) {
            clearInterval(intervalo);
        }
    }, [segundos]);

    useImperativeHandle(ref, () => ({
        iniciarCronometro,
        pararCronometro
    }));

    function iniciarCronometro(s) {
        setSegundos(s);
        const interval = setInterval(() => {
            setSegundos(s => s - 1);
        }, 1000);
        setIntervalo(interval);
    }

    function pararCronometro() {
        clearInterval(intervalo);
        return segundos;
    }

    const getButtonClass = () => {
        if (segundos <= 5 && segundos > 0) {
            return "bg-danger pulse"; 
        }
        return "bg-primary";
    };

    return (
        <Button 
        size="lg" 
        className={`m-2 ${getButtonClass()}`} 
        style={{ 
            display: segundos == null ? 'none' : 'initial', 
            border: 'none',
        }}
    >
        <i className='bi bi-stopwatch'></i> {segundos?.toString().padStart(2, "0")}
    </Button>
    );
});

export default function Jogo() {
    const { nivel } = useParams();
    const navigate = useNavigate();
    const itemsRef = useRef([]);
    const refCronometro = useRef(null);
    const [cartoes, setCartoes] = useState([]);
    const [ultimoIndiceSelecionado, setUltimoIndiceSelecionado] = useState();
    const [acertos, setAcertos] = useState(0);
    const [erros, setErros] = useState(0);
    const [pontuacao, setPontuacao] = useState(0);
    const [iniciou, setIniciou] = useState(false);
    const [finalizou, setFinalizou] = useState(false);
    const [cronometroClasse, setCronometroClasse] = useState("")

    useEffect(() => {
        if (!nivel) navigate("/inicio");
        compararNivel(nivel);
    }, [nivel, navigate]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, cartoes.length);
    }, [cartoes]);

    useEffect(() => {
        if (iniciou) {
            window.onbeforeunload = (event) => {
                event.preventDefault();
                return 'Deseja mesmo sair da página? Você vai perder o seu jogo em atividade.';
            };
        }
    }, [iniciou]);

    useEffect(() => {
        if (iniciou && refCronometro.current) {
            const intervalo = setInterval(() => {
                const tempoRestante = refCronometro.current.getTempoRestante();
                if (tempoRestante <= 3) {
                    setCronometroClasse("cronometro-pulso");
                } else {
                    setCronometroClasse("");
                }
            }, 1000);

            return () => clearInterval(intervalo);
        }
    }, [iniciou]);

    function compararNivel(nivel) {
        gerarCartoes(dadosNivel[nivel].quantidadeCartas);
    }

    useEffect(() => {
        let tempoRestante = 0;
        if (acertos === dadosNivel[nivel].quantidadeCartas) {
            tempoRestante = refCronometro.current.pararCronometro();
            document.getElementById("encerramento").play();
            setFinalizou(true);
        }
        const total = (acertos * dadosNivel[nivel].pesoAcerto) - (erros * dadosNivel[nivel].pesoErro) + (tempoRestante * dadosNivel[nivel].bonus);
        setPontuacao(total);
    }, [acertos, erros, nivel]);

    function gerarCartoes(quantidade) {
        const cartoesPadrao = cartas.slice();
        let cartoesEscolhidos = [];
        while (cartoesEscolhidos.length < quantidade) {
            const posicao = Math.floor(Math.random() * cartoesPadrao.length);
            const cartaoEscolhido = cartoesPadrao[posicao];
            if (cartaoEscolhido) {
                cartoesEscolhidos.push(cartaoEscolhido);
                cartoesPadrao.splice(posicao, 1);
            }
        }
        misturarCartas(cartoesEscolhidos);
    }

    function misturarCartas(cartoes) {
        const cartoesDuplicados = cartoes.concat(cartoes);
        const tamanhoLista = cartoesDuplicados.length;
        let cartoesMesclados = [];

        while (cartoesMesclados.length < tamanhoLista) {
            const posicao = Math.floor(Math.random() * cartoesDuplicados.length);
            const cartao = cartoesDuplicados[posicao];
            if (cartao) {
                cartoesMesclados.push(cartao);
                cartoesDuplicados.splice(posicao, 1);
            }
        }
        setCartoes(cartoesMesclados);
    }

    function iniciar() {
        setIniciou(true);
        virarCartoes();
        refCronometro.current.iniciarCronometro(dadosNivel[nivel].tempoLeitura);
        const timeoutID = setTimeout(() => {
            virarCartoes();
            bloquearCartoes();
            refCronometro.current.pararCronometro();
            refCronometro.current.iniciarCronometro(dadosNivel[nivel].tempoDesafio);
            clearTimeout(timeoutID);
        }, dadosNivel[nivel].tempoLeitura * 1000);
    }

    async function selecionarCartao(indiceAtual) {
        const timeoutID = setTimeout(() => {
            if (ultimoIndiceSelecionado === indiceAtual) {
                itemsRef.current[indiceAtual].virarCartao();
                setUltimoIndiceSelecionado(undefined);
                return;
            }
            if (ultimoIndiceSelecionado != null) {
                if (cartoes[ultimoIndiceSelecionado].icone === cartoes[indiceAtual].icone) {
                    setAcertos(a => a + 1);
                    itemsRef.current[ultimoIndiceSelecionado].alterarBloqueio();
                    itemsRef.current[indiceAtual].alterarBloqueio();
                    document.getElementById("sucesso").play();
                } else {
                    itemsRef.current[ultimoIndiceSelecionado].virarCartao();
                    itemsRef.current[indiceAtual].virarCartao();
                    setErros(e => e + 1);
                    document.getElementById("erro").play();
                }
                setUltimoIndiceSelecionado(undefined);
            } else {
                setUltimoIndiceSelecionado(indiceAtual);
            }
            clearTimeout(timeoutID);
        }, 250);
    }

    function virarCartoes() {
        itemsRef.current.forEach(ref => ref.virarCartao());
    }

    function bloquearCartoes() {
        itemsRef.current.forEach(ref => ref.alterarBloqueio());
    }

    return (
        <Container fluid className="jogo-container">
            <Row className="justify-content-center mb-3">
                <Col className="text-center">
                    <Button 
                        className="btn-iniciar"
                        size="lg" 
                        onClick={iniciar}
                        style={{ display: iniciou ? 'none' : 'block' }}>
                        <i className="bi bi-play"></i> Iniciar
                    </Button>
                    <Cronometro ref={el => refCronometro.current = el} className={cronometroClasse} />
                </Col>
            </Row>
            <Row className="justify-content-center mb-3" style={{ display: iniciou ? 'flex' : 'none' }}>
                <Col className="text-center stats-col">
                    <i className="bi bi-x-circle text-danger"></i> <span className="text-danger">{erros}</span>
                </Col>
                <Col className="text-center stats-col">
                    <i className="bi bi-check-circle text-success"></i> <span className="text-success">{acertos}</span>
                </Col>
                <Col className="text-center stats-col">
                    <i className="bi bi-trophy-fill text-info"></i> <span className="text-info">{pontuacao}</span>
                </Col>
            </Row>
            
            <div className="cartoes-container">
                <Row className="card-grid">
                    {cartoes.length > 0 ? (
                        cartoes.map((cartao, indice) => (
                            <Col key={indice} className="card-col">
                                <Cartao
                                    cor={cartao.cor}
                                    icone={cartao.icone}
                                    selecionarCartao={() => selecionarCartao(indice)}
                                    ref={el => itemsRef.current[indice] = el}
                                />
                            </Col>
                        ))
                    ) : (
                        <Spinner animation="border" />
                    )}
                </Row>
            </div>
            <Modal show={finalizou} centered data-bs-theme="dark" className="modal-finish">
                <Modal.Header>
                    <Modal.Title className="text-light">Parabéns! Você completou o desafio</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-light">
                    Você atingiu <strong>{pontuacao}</strong> pontos.
                </Modal.Body>
                <Modal.Footer>
                    <Button>Ver Ranking</Button>
                </Modal.Footer>
            </Modal>
            <audio src={Sucesso} id="sucesso" />
            <audio src={Erro} id="erro" />
            <audio src={Encerramento} id="encerramento" />
        </Container>
    );
}
