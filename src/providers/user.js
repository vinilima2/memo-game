import { ProviderInterface } from "./provider";
import memoApi from './config/memoApi';

class UserProvider extends ProviderInterface{
    async registrar(usuario) {
        return this.post('usuarios/cadastrar', usuario).then(() => {
            return true;
        }).catch((error) => {
            console.error(error);
            return false;
        });
    }

    async login(nome, senha){
        return this.post('usuarios/login', {nome, senha}).then((response) => {
            return response.json();
        }).then((data)=>{
            return [true, data.token];
        }).catch((error) => {
            console.error(error);
            return [false, null];
        });
    }

    async novoRecord(nome, pontuacao){
        this.postAutenticado('usuarios/novorecorde', {nome, pontuacao}).then(() => {
            // TODO: Implementar retorno aqui
            return true;
        }).catch((error) => {
            console.error(error);
            return false;
        });
    }
};

export default new UserProvider(memoApi);