import { propTypes } from "react-bootstrap/esm/Image";
import { tipoRankingType } from "../../utils/ranking";
import { Button } from "react-bootstrap";

const RankingButtons = ({ tipoRanking }) => {
  return (
    <div className="ranking-page-buttons">
      <Button className="btn btn-primary" href="/">
        <i className="small-icon bi bi-arrow-left-circle"></i>
        <i className="big-icon bi bi-arrow-left-circle h1"></i>
      </Button>
      {tipoRanking == tipoRankingType.PESSOAL ? (
        <Button
          className="btn btn-warning h1"
          href={`/ranking/${tipoRankingType.GLOBAL}`}
        >
          <i className="small-icon bi bi-globe2"></i>
          <i className="big-icon bi bi-globe2 h1"></i>
        </Button>
      ) : (
        <Button
          className="btn btn-warning"
          href={`/ranking/${tipoRankingType.PESSOAL}`}
        >
          <i className="small-icon bi bi-person-circle"></i>
          <i className="big-icon bi bi-person-circle h1"></i>
        </Button>
      )}
    </div>
  );
};

RankingButtons.propTypes = {
  tipoRanking: propTypes.string,
};

export default RankingButtons;
