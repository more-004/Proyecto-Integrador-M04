import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { JSX } from "react/jsx-runtime";

interface Props {
    children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Cargando sesión...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};