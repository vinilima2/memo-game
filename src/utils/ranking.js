// Implementação provisória de métodos e requisição para exibição do ranking

import { dadosUsuarioMaiorPontuacaoRankingGlobal, historicoPontosUsuarioTop10 } from "../mocks/dados";
import RankingProvider from "../providers/ranking";

// Requisitar informações do ranking
export const buscarRanking = async (tipoRanking, usuario) => {

    let retorno;

    if (tipoRanking === tipoRankingType.GLOBAL) {
        retorno = await RankingProvider.buscarTop10Global();
    } else {
        retorno = await Promise.resolve(historicoPontosUsuarioTop10);
        retorno = retorno.map((item)=>({...item, nome: usuario.nome}))
    }

    // ordenarRanking(retorno);
    return retorno;
}

export const buscarMaiorRankUsuario = async (usuario) => {
    return await Promise.resolve({...dadosUsuarioMaiorPontuacaoRankingGlobal, nome: usuario.nome});
}

// REVIEW: Problema pois se o usuário passa o nome no inicio
// como pode funcionar se ja tiver outro usuario com esse nome?
// opt1 - Recusar pois ja existe
// opt2 - Criar sistema de cadastro
export const tipoRankingType = {
    GLOBAL: 'GLOBAL',
    PESSOAL: 'PESSOAL'
}

