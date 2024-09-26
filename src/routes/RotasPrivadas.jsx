import {useContext} from "react";
import {TokenContext} from "../main.jsx";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export default function RotasPrivadas() {
    const location = useLocation();
    const {token, validaToken} = useContext(TokenContext)

    if(token){
        if(validaToken(token)){
            return <Outlet/>
        }
    }
    return <Navigate to="/" replace state={{from: location}}/>;
}