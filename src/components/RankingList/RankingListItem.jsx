import { Stack } from "react-bootstrap";
import PropTypes from "prop-types";

const RankingListItem = ({ user = { nome: "", pontos: 0 }, ranking }) => {
  return (
    <Stack direction="horizontal">
      <span>{ranking}</span>
      <span>{user.nome}</span>
      <span>{user.pontos}</span>
    </Stack>
  );
};

RankingListItem.propTypes = {
  user: PropTypes.shape({
    nome: PropTypes.string,
    pontos: PropTypes.number,
  }),
  ranking: PropTypes.number,
};

export default RankingListItem;
