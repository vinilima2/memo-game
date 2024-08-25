import {createRoot} from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {routes} from './routes/Router.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'
import {createContext, useState} from "react";


export const TokenContext = createContext()

export const TokenProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("memo-game-token"))

    return (
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    );
}
createRoot(document.getElementById('root')).render(
    <TokenProvider children={<RouterProvider router={routes}/>}/>
)
