import { propTypes } from "react-bootstrap/esm/Image";
import { tipoRankingType } from "../../utils/ranking";
import { Button } from "react-bootstrap";

const RankingButtons = ({ tipoRanking }) => {
    return (
        <div className="position-absolute d-flex" style={{right: '10px', top: '10px', gap: '10px'}}>
            <Button className="btn btn-primary" href='/'>Home</Button>
            {tipoRanking == tipoRankingType.PESSOAL ?
                <Button className="btn btn-secondary" href={`/ranking/${tipoRankingType.GLOBAL}`}>Global</Button>
                : 
                <Button className="btn btn-secondary" href={`/ranking/${tipoRankingType.PESSOAL}`}>Pessoal</Button>
            }
        </div>
    );
}

RankingButtons.propTypes = {
    tipoRanking: propTypes.string
}

export default RankingButtons;