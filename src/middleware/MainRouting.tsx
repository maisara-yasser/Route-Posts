import type React from "react";
import { Navigate } from "react-router-dom";

export default function MainRouting({ children }: { children: React.ReactNode }) {

    const userToken = localStorage.getItem('tkn');
    if (userToken) 
        return <Navigate to={'/feed'}></Navigate>
    
    return children;

}
