import { ProviderInterface } from "./provider";
import memoApi from './config/memoApi';

class RankingProvider extends ProviderInterface{
    async buscarTop10Global(){
        return this.getAutenticado('ranking/get').then(async (response) => {
            return response.json();
        })
    }

    async buscarRankingUsuario(usuario){
        return this.getAutenticado(`ranking/get/${usuario.nome}`).then(async (response) => {
            return response.json();
        })
    }
};

export default new RankingProvider(memoApi);