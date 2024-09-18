import {createBrowserRouter} from "react-router-dom";
import Login from "../screens/Login";
import Registro from "../screens/Registro";
import Jogo from "../screens/Jogo";
import Ranking from "../screens/Ranking/Ranking.jsx";
import RotasPrivadas from "./RotasPrivadas.jsx";


export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path: '/registro',
        element: <Registro/>
    },
    {
        element: <RotasPrivadas/>,
        children: [
            {
                path: "/jogo/:nivel?",
                element: <Jogo/>
            },
            {
                path: "/ranking/:tipo?",
                element: <Ranking/>
            }
        ]
    }
]);
