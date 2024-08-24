import RankingListItem from "./RankingListItem";
import PropTypes from "prop-types";
import { Stack } from "react-bootstrap";
import { tipoRankingType } from "../../utils/ranking";
import ImagemTrofeu from "../../assets/ranking/trofeu.png";

const RankingList = ({ usersList, tipoRanking }) => {
  return (
    <Stack className="ranking-list-container">
      <Stack className="ranking-list-header" direction="vertical">
        <img src={ImagemTrofeu}/>

        {tipoRanking == tipoRankingType.GLOBAL ? (
          <h1>Ranking Global</h1>
        ) : (
          <h1>Ranking {usersList[0].nome}</h1>
        )}
      </Stack>
      <div
        className="ranking-list-content"
      >
        {usersList.map((user, index) => (
          <RankingListItem
            key={`${index}-${user.pontos}`}
            user={user}
            ranking={index + 1}
            tipoRanking={tipoRanking}
          />
        ))}
      </div>
    </Stack>
  );
};

RankingList.propTypes = {
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string,
      pontos: PropTypes.number,
    })
  ).isRequired,
  tipoRanking: PropTypes.string,
};

export default RankingList;
