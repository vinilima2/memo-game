import { createBrowserRouter } from "react-router-dom";
import Inicio from "../screens/Inicio";
import Jogo from "../screens/Jogo";
import Ranking from "../screens/Ranking";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: (<Inicio />)
    },
    {
        path: "/jogo/:nivel",
        element: (<Jogo />)
    },
    {
        path: "/ranking/:tipo",
        element: (<Ranking />)
    }
]);