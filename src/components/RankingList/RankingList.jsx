import RankingListItem from "./RankingListItem";
import PropTypes from "prop-types";
import { Stack } from "react-bootstrap";
import { buscarMaiorRankUsuario, tipoRankingType } from "../../utils/ranking";
import ImagemTrofeu from "../../assets/ranking/trofeu.png";
import { useContext, useEffect, useMemo, useState } from "react";
import { TokenContext } from "../../main";

const RankingList = ({ usersList, tipoRanking }) => {
  const {usuario} = useContext(TokenContext);
  const [userGlobalRank, setUserGlobalRank] = useState(null);

  const usuarioEstaNoTop10 = useMemo(() => {
    console.log(usersList)
    console.log(userGlobalRank)
    // OBS: Só vai funcionar se o nome for único
    return usersList.some((user) => user.nome === usuario.nome);
  }, [usersList, userGlobalRank, usuario]);

  useEffect(() => {
    buscarMaiorRankUsuario(usuario).then((userTopRank) => {
      setUserGlobalRank(userTopRank);
    });
  }, [usuario])

  return (
    <Stack className="ranking-list-container">
      <Stack className="ranking-list-header" direction="vertical">
        <img src={ImagemTrofeu}/>

        {tipoRanking == tipoRankingType.GLOBAL ? (
          <h1>Ranking Global</h1>
        ) : (
          <>
            <h1>{usersList[0].nome}</h1>
            <h3>Record Pessoal</h3>
          </>
        )}
      </Stack>
      <div
        className="ranking-list-content"
      >
        {usersList.map((user, index) => (
          <RankingListItem
            key={`${index}-${user.pontos}`}
            user={user}
            tipoRanking={tipoRanking}
            usuarioLogado={user.nome === usuario.nome}
          />
        ))}
        {!usuarioEstaNoTop10 && tipoRanking == tipoRankingType.GLOBAL && userGlobalRank ?
        (
          <RankingListItem
            user={userGlobalRank}
            tipoRanking={tipoRanking}
            usuarioLogado
          />
        ) : null}
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
