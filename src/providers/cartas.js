import { ProviderInterface } from "./provider";
import memoApi from './config/memoApi';

class CartasProvider extends ProviderInterface{
    async buscarCartasAleatorias(quantidadeCartas){
        return this.getAutenticado(`cartas/get/random?qtd=${quantidadeCartas}`).then(async (response) => {
                return response.json();
            }).catch((error) => {
                console.error(error);
            });
    }
};

export default new CartasProvider(memoApi);