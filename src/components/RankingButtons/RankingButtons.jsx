import {tipoRankingType} from "../../utils/ranking";
import {Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import {useState} from "react";

const RankingButtons = (tipoRanking) => {
    const [visivel, setVisibilidade] = useState(false)

    return (
        <>
            <div className="ranking-page-buttons">
                <Button
                    className="btn btn-warning"
                    href={`/ranking/${tipoRankingType.PESSOAL}`}
                >
                    <i className="small-icon bi bi-person-circle"></i>
                    <i className="big-icon bi bi-person-circle h1"></i>
                </Button>

                {tipoRanking === tipoRankingType.PESSOAL ? (
                    <Button
                        className="btn btn-warning h1"
                        href={`/ranking/${tipoRankingType.GLOBAL}`}
                    >
                        <i className="small-icon bi bi-globe2"></i>
                        <i className="big-icon bi bi-globe2 h1"></i>
                    </Button>
                ) : (
                    <Button className="btn btn-primary" onClick={() => setVisibilidade(true)}>
                        <i className="small-icon bi bi-arrow-left-circle"></i>
                        <i className="big-icon bi bi-arrow-left-circle h1"></i>
                    </Button>
                )}
            </div>

            <Modal show={visivel} data-bs-theme="dark">
            <Modal.Header closeButton>
                    <Modal.Title  className="text-light">Confirmar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p  className="text-light">Deseja realmente sair do MemoGame?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" href="/">Sair</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

RankingButtons.propTypes = {
    tipoRanking: PropTypes.string,
};

export default RankingButtons;
