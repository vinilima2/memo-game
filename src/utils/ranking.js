// Implementação provisória de métodos e requisição para exibição do ranking

// Requisitar informações do ranking
export const buscarRanking = async () => {
    const retorno = await Promise.resolve([
        { nome: 'Alice', pontos: 100 },
        { nome: 'Bob', pontos: 90 },
        { nome: 'Carol', pontos: 80 }
    ]);

    ordenarRanking(retorno);
    return retorno;
}

const ordenarRanking = (ranking) => {
    // Se b for > a então o resultado é positivo
    // POSITIVO: b vai ficar antes de a
    // NEGATIVO: a vai ficar antes de b
    ranking.sort((a, b) => { return b.pontos - a.pontos })
}



