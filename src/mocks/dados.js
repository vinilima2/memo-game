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