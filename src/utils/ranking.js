// Implementação provisória de métodos e requisição para exibição do ranking

// Requisitar informações do ranking
export const buscarRanking = async (tipoRanking) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    let retorno;

    if (tipoRanking === tipoRankingType.GLOBAL) {
        retorno = await Promise.resolve([
            { nome: 'Alice', pontos: 100 },
            { nome: 'Bob', pontos: 90 },
            { nome: 'Carol', pontos: 80 }
        ]);
    }else{
        retorno = await Promise.resolve([
            { nome: 'Alice', pontos: 100 },
            { nome: 'Bob', pontos: 90 },
            { nome: 'Carol', pontos: 80 }
        ]);

    }

    ordenarRanking(retorno);
    return retorno;
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

