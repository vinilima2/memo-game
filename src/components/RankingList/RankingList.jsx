import { useEffect } from "react";
import RankingListItem from "./RankingListItem";
import PropTypes from "prop-types";
import { Stack } from "react-bootstrap";

const RankingList = ({ usersList }) => {
  useEffect(() => {
    console.log(usersList);
  }, []);

  return <Stack className="align-items-center mt-5">
    <h1>Ranking Global</h1>
    <div className="d-flex flex-column align-itens-center w-50 mt-5" style={{gap: '20px'}}>
      <Stack direction="horizontal" className="justify-content-between px-lg-3">
        <span style={{fontSize: '1.4rem', width: '200px'}}>POSIÇÃO</span>
        <span style={{fontSize: '1.4rem'}}>NOME</span>
        <span style={{fontSize: '1.4rem', width: '200px', textAlign: 'right'}}>PONTUAÇÃO</span>
      </Stack>

      {usersList.map((user, index) => (
        <RankingListItem
          key={`${index}-${user.pontos}`}
          user={user}
          ranking={index + 1}
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
};

export default RankingList;
