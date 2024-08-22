import { useState } from "react";
import RankingList from "../components/RankingList/RankingList";
import { buscarRanking, tipoRankingType } from "../utils/ranking";
import Loading from "../components/Loading/Loading";
import { useParams } from "react-router-dom";

export default function Ranking() {
  const { tipo } = useParams();
  const [tipoRanking, setTipoRanking] = useState(tipoRankingType.GLOBAL);
  const [usersList, setUsersList] = useState();
  const [loading, setLoading] = useState(true);

  useState(() => {
    if(tipo == tipoRankingType.GLOBAL || tipo == tipoRankingType.PESSOAL) 
      setTipoRanking(tipo);

    buscarRanking(tipoRanking).then((ranking) => {
      setUsersList(ranking);
      setLoading(false);
    });
  }, []);

  return (
    <main style={{color: 'white'}}>
      {loading ? 
        <Loading/>
      : 
        <RankingList usersList={usersList} />
      }
    </main>
  );
}
