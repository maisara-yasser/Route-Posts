import type React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/auth.context";

export default function ProtectedRoute({children}:{children: React.ReactNode}) {
    
    const context = useContext(authContext);
    
    if (!context) {
        throw new Error("Auth context is not available");
    }
    const { isLogin } = context;
    if (!isLogin) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>
}
