import { Stack } from "react-bootstrap";
import PropTypes from "prop-types";
import { tipoRankingType } from "../../utils/ranking";
import { useMemo } from "react";

import ImgPrimeiroLugar from "../../assets/ranking/primeiro.png";
import ImgSegundoLugar from "../../assets/ranking/segundo.png";
import ImgTerceiroLugar from "../../assets/ranking/terceiro.png";

const RankingListItem = ({
  user = { nome: "", pontos: 0 },
  tipoRanking,
  usuarioLogado,
}) => {
  const rankImage = useMemo(() => {
    if (user.rank > 3) {
      return null;
    }

    switch (user.rank) {
      case 1:
        return ImgPrimeiroLugar;
      case 2:
        return ImgSegundoLugar;
      case 3:
        return ImgTerceiroLugar;
    }
  }, [user]);

  return (
    <Stack
      direction="horizontal"
      className="ranking-item"
      style={{
        backgroundColor: rankImage ? "#212529" : "#1C2023",
        border: usuarioLogado ? "2px solid #FFD700" : "none",
      }}
    >
      <div className="ranking-item-left-content">
        <div className="ranking-item-rank">
          {rankImage ? <img src={rankImage} /> : user.rank}
        </div>

        {tipoRanking == tipoRankingType.GLOBAL ? (
          <span className="nome">{user.nome}</span>
        ) : null}
      </div>
      <span className="ranking-item-right-content">
        {user.pontos} <i>pts</i>
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
  usuarioLogado: PropTypes.bool,
};

export default RankingListItem;
