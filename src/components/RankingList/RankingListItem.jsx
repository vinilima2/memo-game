import { Stack } from "react-bootstrap";
import PropTypes from "prop-types";
import { tipoRankingType } from "../../utils/ranking";

const RankingListItem = ({
  user = { nome: "", pontos: 0 },
  ranking,
  tipoRanking,
}) => {
  return (
    <Stack direction="horizontal" className="ranking-item">
      <div className="ranking-item-left-content">
        <div className="ranking-item-rank">
          {ranking}
        </div>

        {tipoRanking == tipoRankingType.GLOBAL ? (
          <span className="nome">{user.nome}</span>
        ) : null}
      </div>

      <span
        className="ranking-item-right-content"
      >
        {user.pontos} pts
      </span>
    </Stack>
  );
};

RankingListItem.propTypes = {
  user: PropTypes.shape({
    nome: PropTypes.string,
    pontos: PropTypes.number,
  }),
  ranking: PropTypes.number,
  tipoRanking: PropTypes.string,
};

export default RankingListItem;
