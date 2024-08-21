import { Stack } from "react-bootstrap";
import PropTypes from "prop-types";

const RankingListItem = ({ user = { nome: "", pontos: 0 }, ranking }) => {
  return (
    <Stack direction="horizontal" className="px-5 py-4 rounded-2 mw-50 justify-content-between" style={{background: '#444'}}>
      <span style={{fontSize: '1.4rem', width: '50px'}}>{ranking}</span>
      <span style={{fontSize: '1.5rem'}}>{user.nome}</span>
      <span style={{fontSize: '1.5rem', width: '50px', textAlign: 'right'}}>{user.pontos}</span>
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
