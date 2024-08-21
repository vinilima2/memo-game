import { useState } from "react";
import RankingList from "../components/RankingList/RankingList";
import { buscarRanking } from "../utils/ranking";

export default function Ranking() {
  const [usersList, setUsersList] = useState();
  const [loading, setLoading] = useState(true);

  useState(() => {
    buscarRanking().then((ranking) => {
      setUsersList(ranking);
      setLoading(false);
    });
  }, []);

  return (
    <main style={{color: 'white'}}>
      {loading ? <p>Carregando...</p> : 
      <RankingList usersList={usersList} />
      }
    </main>
  );
}
