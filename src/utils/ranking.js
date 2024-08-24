// Implementação provisória de métodos e requisição para exibição do ranking

// Requisitar informações do ranking
export const buscarRanking = async (tipoRanking) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    let retorno;

    if (tipoRanking === tipoRankingType.GLOBAL) {
        retorno = await Promise.resolve([
            { nome: 'Eduardo Valencio', pontos: 2345 },
            { nome: 'Vinicius Lima', pontos: 3456 },
            { nome: 'Thomas Pinheiro', pontos: 4567 },
            { nome: 'Danilo Yoshilly', pontos: 5678 },
            { nome: 'Kamily Oliveira', pontos: 6789 },
            { nome: 'Luiz Gustavo', pontos: 7890 },
            { nome: 'Sonic vs Mario', pontos: 8901 },
        ]);
    } else {
        retorno = await Promise.resolve([
            { nome: 'Vinicius Lima', pontos: 123 },
            { nome: 'Vinicius Lima', pontos: 234 },
            { nome: 'Vinicius Lima', pontos: 345 },
            { nome: 'Vinicius Lima', pontos: 456 },
            { nome: 'Vinicius Lima', pontos: 567 },
            { nome: 'Vinicius Lima', pontos: 678 },
            { nome: 'Vinicius Lima', pontos: 789 },
            { nome: 'Vinicius Lima', pontos: 890 },
            { nome: 'Vinicius Lima', pontos: 901 },
            { nome: 'Vinicius Lima', pontos: 1012 },
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

