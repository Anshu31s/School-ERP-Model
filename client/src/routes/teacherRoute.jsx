import React from 'react';
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
    const isAuthenticated = useSelector((state) => state.auth.isauthenticated);
    const userRole = useSelector((state) => state.auth.user.userType);
    const isActive = useSelector((state) => state.auth.user.active);

    return isAuthenticated && userRole !== 'student' && isActive ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
}

export default AdminRoute;
