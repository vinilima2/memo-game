export class ProviderInterface{
    apiUrl;

    constructor(apiUrl){
        this.apiUrl = apiUrl;
    }

    async get(rota){
        return fetch(`${this.apiUrl}/${rota}`, {
            method: 'GET',
        })
    }

    async post(rota, body){
        return fetch(`${this.apiUrl}/${rota}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    async put(rota, body){
        return fetch(`${this.apiUrl}/${rota}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
    }

    async delete(rota){
        return fetch(`${this.apiUrl}/${rota}`, {
            method: 'GET',
        })
    }

    async getAutenticado(rota){
        return fetch(`${this.apiUrl}/${rota}`, {
            method: 'GET',
            credentials: 'include',
        })
    }

    async postAutenticado(rota, body){
        return fetch(`${this.apiUrl}/${rota}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })
    }

    async putAutenticado(rota, body){
        return fetch(`${this.apiUrl}/${rota}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })
    }

    async deleteAutenticado(rota){
        return fetch(`${this.apiUrl}/${rota}`, {
            method: 'GET',
            credentials: 'include',
        })
    }
}