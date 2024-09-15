import React from 'react'
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
    const isAuthenticated = useSelector((state) => state.auth.isauthenticated);
    const userRole = useSelector((state) => state.auth.user.userType);

    return isAuthenticated && userRole === 'admin' ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoute