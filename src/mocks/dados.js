export const cartas = [
    {icone:'star-fill', cor:'yellow'},
    {icone:'moon-fill', cor:'darkgray'},
    {icone:'flower1', cor:'red'},
    {icone:'heart-fill', cor:'red'},
    {icone:'cup-straw', cor:'lightblue'},
    {icone:'tree-fill', cor:'green'},
    {icone:'fire', cor:'red'},
    {icone:'droplet-fill', cor:'lightblue'},
    {icone:'watch', cor:'black'},
    {icone:'balloon-fill', cor:'yellow'},
    {icone:'truck-front-fill', cor:'darkgray'},
    {icone:'car-front-fill', cor:'darkgray'},
    {icone:'airplane-fill', cor:'darkgray'},
    {icone:'scissors', cor:'darkgray'},
    {icone:'pencil-fill', cor:'red'},
    {icone:'mouse2-fill', cor:'lightblue'},
    {icone:'bicycle', cor:'black'},
    {icone:'train-front-fill', cor:'darkgray'},
]

export const dadosNivel = {
    facil: {
        quantidadeCartas: 3,
        tempoLeitura: 5,
        tempoDesafio: 10,
        pesoAcerto: 1,
        pesoErro: 0.5,
        bonus: 0.5
    },
    medio: {
        quantidadeCartas: 6,
        tempoLeitura: 10,
        tempoDesafio: 15,
        pesoAcerto: 2,
        pesoErro: 1,
        bonus: 0.8
    },
    dificil: {
        quantidadeCartas: 9,
        tempoLeitura: 15,
        tempoDesafio: 10,
        pesoAcerto: 3,
        pesoErro: 1,
        bonus: 1
    }
}

//---------------------------------------------------------------------------------------------------- 
// SOMENTE PARA TESTE E VISUALIZAÇÃO DE POSSIVEIS MODELOS DE TRANSFERENCIA
//---------------------------------------------------------------------------------------------------- 

export const dadosUsuario = {
    nome: 'Alice Braga',
}

export const dadosUsuarioMaiorPontuacaoRankingGlobal = {
    rank: 38,
    nome: undefined,
    pontos: 1203
}

export const rankingGlobalTop10 = [
    { nome: 'Sonic vs Mario', pontos: 8901, rank: 1 },
    { nome: 'Luiz Gustavo', pontos: 7890, rank: 2 },
    { nome: 'Kamily Oliveira', pontos: 6789, rank: 3 },
    { nome: 'Danilo Yoshilly', pontos: 5678, rank: 4 },
    { nome: 'Thomas Pinheiro', pontos: 4567, rank: 5 },
    { nome: 'Vinicius Lima', pontos: 3456, rank: 6 },
    { nome: 'Eduardo Valencio', pontos: 2345, rank: 7 },
    { nome: 'Irineu Santos', pontos: 2245, rank: 8 },
    { nome: 'Gabriel Horse', pontos: 2135, rank: 9 },
    { nome: 'Emilia de Pano', pontos: 1642, rank: 10 }
]

export const historicoPontosUsuarioTop10 = [
    { rank: 38, pontos: 1203 },
    { rank: 59, pontos: 998 },
    { rank: 42, pontos: 1150 },
    { rank: 47, pontos: 1100 },
    { rank: 51, pontos: 1050 },
    { rank: 63, pontos: 950 },
    { rank: 70, pontos: 900 },
    { rank: 85, pontos: 850 },
    { rank: 44, pontos: 1125 },
    { rank: 56, pontos: 1000 },
    { rank: 61, pontos: 975 },
    { rank: 78, pontos: 875 },
];
