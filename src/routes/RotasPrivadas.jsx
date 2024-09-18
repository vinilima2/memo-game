import {useContext} from "react";
import {TokenContext} from "../main.jsx";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export default function RotasPrivadas() {
    const location = useLocation();
    const {token} = useContext(TokenContext)

    return token
        ? <Outlet/>
        : <Navigate to="/" replace state={{from: location}}/>;

}