import {createRoot} from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {routes} from './routes/Router.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'
import {createContext, useCallback, useEffect, useState} from "react";
import { jwtDecode } from 'jwt-decode';


export const TokenContext = createContext(
    {
        token: null,
        setToken: () => {},
        usuario: {nome: undefined},
        validaToken: () => {}
    }
)

export const TokenProvider = ({children}) => {
    const [token, setTokenState] = useState(localStorage.getItem("memo-game-token"))
    const [usuario, setUsuario] = useState()

    useEffect(()=>{
        if(token){
            decodeToken();
        }
    },[token])

    const setToken = useCallback((novoToken)=>{
        setTokenState(novoToken);
        localStorage.setItem("memo-game-token", novoToken);
        document.cookie = `token=${novoToken}`;
        const conteudoJwt = jwtDecode(novoToken);
        setUsuario({nome: conteudoJwt.sub})
    },[])

    const validaToken = useCallback(()=>{
        if (!token) {
            localStorage.removeItem("memo-game-token");
            return false
        };
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    },[token])

    const decodeToken = useCallback(()=>{
        if (!token) return null;

        const decoded = jwtDecode(token);
        setUsuario({nome: decoded.sub})
        return decoded;
    }, [token])

    return (
        <TokenContext.Provider value={{token, setToken, usuario, validaToken}}>
            {children}
        </TokenContext.Provider>
    );
}
createRoot(document.getElementById('root')).render(
    <TokenProvider>
        <RouterProvider router={routes}/>
    </TokenProvider> 
)
