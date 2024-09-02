import React from 'react'
import { useSelector } from "react-redux";
import { Outlet, Navigate} from "react-router-dom";
const AuthRoute = () => {
    const isAuthenticated = useSelector((state) => state.auth.isauthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
export default AuthRoute
