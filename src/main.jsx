import {createRoot} from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {routes} from './routes/Router.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'
import {createContext, useEffect, useState} from "react";
import { dadosUsuario } from './mocks/dados.js';


export const TokenContext = createContext(
    {
        token: null,
        setToken: () => {},
        usuario: {nome: undefined}
    }
)

export const TokenProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("memo-game-token"))
    const [usuario, setUsuario] = useState(dadosUsuario)

    useEffect(() => {
        if(token){
            //TODO: Realizar o decode do JWT e extrair dados de usuario
        }
    }, [token])

    return (
        <TokenContext.Provider value={{token, setToken, usuario}}>
            {children}
        </TokenContext.Provider>
    );
}
createRoot(document.getElementById('root')).render(
    <TokenProvider children={<RouterProvider router={routes}/>}/>
)
