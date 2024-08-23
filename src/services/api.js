const URL_BASE = "http://192.168.0.119:8080"

export async function buscarCartas() {
    return await fetch(URL_BASE + "/cartas", {
        method: "GET"
    }).then((resposta) => {
        return resposta.json()
    });
}