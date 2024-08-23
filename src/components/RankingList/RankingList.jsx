import RankingListItem from "./RankingListItem";
import PropTypes from "prop-types";
import { Stack } from "react-bootstrap";
import { tipoRankingType } from "../../utils/ranking";

const RankingList = ({ usersList, tipoRanking }) => {
  return <Stack className="align-items-center mt-5">
  {tipoRanking == tipoRankingType.GLOBAL ?
    <h1>Ranking Global</h1>
    :
    <h1>Ranking {usersList[0].nome}</h1>
  }
    <div className="d-flex flex-column align-itens-center w-50 mt-5" style={{gap: '20px'}}>
      <Stack direction="horizontal" className="justify-content-between px-lg-3">
        <span style={{fontSize: '1.4rem', width: '200px'}}>POSIÇÃO</span>

        {tipoRanking == tipoRankingType.GLOBAL? 
          <span style={{fontSize: '1.4rem'}}>NOME</span>
          :
          null
        }

        <span style={{fontSize: '1.4rem', width: '200px', textAlign: 'right'}}>PONTUAÇÃO</span>
      </Stack>

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
