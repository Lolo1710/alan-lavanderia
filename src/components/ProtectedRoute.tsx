import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" replace />; // Redirige a la landing si no hay token
    }

    return children;
}
