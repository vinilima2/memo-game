// Implementação provisória de métodos e requisição para exibição do ranking

import { dadosUsuarioMaiorPontuacaoRankingGlobal, historicoPontosUsuarioTop10, rankingGlobalTop10 } from "../mocks/dados";

// Requisitar informações do ranking
export const buscarRanking = async (tipoRanking, usuario) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    let retorno;

    if (tipoRanking === tipoRankingType.GLOBAL) {
        // TODO: Implementar consulta aqui
        retorno = await Promise.resolve(rankingGlobalTop10);
    } else {
        retorno = await Promise.resolve(historicoPontosUsuarioTop10);
        retorno = retorno.map((item)=>({...item, nome: usuario.nome}))
    }

    ordenarRanking(retorno);
    return retorno;
}

export const buscarMaiorRankUsuario = async (usuario) => {
    return await Promise.resolve({...dadosUsuarioMaiorPontuacaoRankingGlobal, nome: usuario.nome});
}

const ordenarRanking = (ranking) => {
    // Se b for > a então o resultado é positivo
    // POSITIVO: b vai ficar antes de a
    // NEGATIVO: a vai ficar antes de b
    ranking.sort((a, b) => { return b.pontos - a.pontos })
}

// REVIEW: Problema pois se o usuário passa o nome no inicio
// como pode funcionar se ja tiver outro usuario com esse nome?
// opt1 - Recusar pois ja existe
// opt2 - Criar sistema de cadastro
export const tipoRankingType = {
    GLOBAL: 'GLOBAL',
    PESSOAL: 'PESSOAL'
}

