import {useState, useEffect, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {cartas, dadosNivel} from "../mocks/dados";
import {Button, Col, Container, Modal, Row, Spinner} from "react-bootstrap";
import Cartao from "../components/Cartao";
import "../Jogo.css";
import Sucesso from "../assets/sucesso.mp3";
import Erro from "../assets/erro.mp3";
import Encerramento from "../assets/encerramento.mp3";
import Cronometro from "../components/Cronometro.jsx";
import {get, post} from "../services/api.js";

export default function Jogo() {
    const {nivel} = useParams();
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
        if (!nivel) navigate("/ranking/GLOBAL");
        buscarCartas()
        // compararNivel(nivel);
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

    useEffect(() => {
        if (finalizou) salvarPontuacao()
    }, [finalizou]);



    async function salvarPontuacao() {
        const dados = await get(`/users?email=${localStorage.getItem("email")}`) // TODO NUNCA FAÇA ISSO NA VIDA REAL
        const resposta = await post("/ranking", {
            pontuacao,
            usuario: dados[0].username
        })
    }

    function buscarCartas() {
        get('/cartas/get/random?qtd=' + dadosNivel[nivel].quantidadeCartas).then(result => {
            if (result && Array.isArray(result)) setCartoes(result)
        })
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
            <h2 className="jogo-title">MemoGame</h2>
            <Row className="justify-content-center mb-3">
                <Col className="text-center">
                    <div className="btn-iniciar-wrapper" style={{display: iniciou ? 'none' : 'flex'}}>
                        <Button
                            className="btn-iniciar px-4 py-2"
                            size="lg"
                            onClick={iniciar}>
                            <i className="bi bi-play"></i> Iniciar
                        </Button>
                    </div>


                    <Cronometro ref={el => refCronometro.current = el} className={cronometroClasse}/>
                </Col>
            </Row>
            <Row className="justify-content-center mb-3"
                 style={{display: iniciou ? 'flex' : 'none'}}>
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
                <div className="card-grid">
                    {cartoes.length > 0 ? (
                        cartoes.map((cartao, indice) => (
                            <div key={indice} className="card-col">
                                <Cartao
                                    cor={cartao.cor}
                                    icone={cartao.icone}
                                    selecionarCartao={() => selecionarCartao(indice)}
                                    ref={el => itemsRef.current[indice] = el}
                                />
                            </div>
                        ))
                    ) : (
                        <Spinner animation="border"/>
                    )}
                </div>
            </div>
            <Modal show={finalizou} centered data-bs-theme="dark">
                <Modal.Header>
                    <Modal.Title className="text-light">Parabéns! Você completou o desafio</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-light">
                    Você atingiu <strong>{pontuacao}</strong> pontos.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => navigate('/ranking/GLOBAL')}>Ver Ranking</Button>
                </Modal.Footer>
            </Modal>
            <audio src={Sucesso} id="sucesso"/>
            <audio src={Erro} id="erro"/>
            <audio src={Encerramento} id="encerramento"/>
        </Container>
    );
}