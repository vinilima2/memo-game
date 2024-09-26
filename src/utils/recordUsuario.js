import UserProvider from "../providers/user.js";
import RankingProvider from "../providers/ranking.js";

export const registrarRecord = async (usuario, pontuacao) => {
    const record = await RankingProvider.buscarRankingUsuario(usuario);

    if(record.pontos < pontuacao){
        await UserProvider.novoRecord(usuario.nome, pontuacao);
    }
}