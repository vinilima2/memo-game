import { ProviderInterface } from "./provider";
import memoApi from './config/memoApi';

class RankingProvider extends ProviderInterface{
    async buscarTop10Global(){
        return this.getAutenticado('ranking/get').then(async (response) => {
            return response.json();
        })
    }
};

export default new RankingProvider(memoApi);