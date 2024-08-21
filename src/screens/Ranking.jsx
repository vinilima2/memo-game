import { useState } from "react";
import RankingList from "../components/RankingList/RankingList";

export default function Ranking() {
  const [usersList, setUsersList] = useState([{ nome: "João", pontos: 100 }]);

  return <RankingList usersList={usersList} />;
}
