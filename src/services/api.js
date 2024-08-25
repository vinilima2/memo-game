const URL_BASE = "http://localhost:8080"

//TODO: Tratar erros e HTTP status
function obterHeaders() {
    const token = localStorage.getItem('memo-game-token')
    if (token) {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    return {
        "Content-Type": "application/json"
    }
}

export async function get(endpoint) {
    return await fetch(URL_BASE + endpoint, {
        method: "GET", headers: obterHeaders()
    }).then((resposta) => {
        return resposta.json()
    });
}

export async function post(endpoint, payload) {
    return await fetch(URL_BASE + endpoint, {
        method: "POST", body: JSON.stringify(payload), headers: obterHeaders()
    }).then((resposta) => {
        return resposta.json()
    });
}