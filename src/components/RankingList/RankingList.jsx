import { useEffect } from "react";
import RankingListItem from "./RankingListItem";
import PropTypes from "prop-types";

const RankingList = ({ usersList }) => {
  useEffect(() => {
    console.log(usersList);
  }, []);

  return usersList.map((user, index) => (
    <RankingListItem
      key={`${index}-${user.pontos}`}
      user={user}
      ranking={index + 1}
    />
  ));
};

RankingList.prototype = {
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string,
      pontos: PropTypes.number,
    })
  ),
};

export default RankingList;
