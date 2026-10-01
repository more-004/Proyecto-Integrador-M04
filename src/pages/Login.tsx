import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../services/auth";

export const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await loginWithEmail(email, password);
            navigate("/");
        } catch (err: any) {
            setError("Error al iniciar sesión. Revisa tus credenciales.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate("/");
        } catch (err: any) {
            setError("Error al iniciar sesión con Google.");
        }
    };

    return (
        <div className="container">
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", marginBottom: "10px" }}>
                    Ingresar
                </button>
            </form>

            <button onClick={handleGoogleLogin} className="btn-secondary" style={{ width: "100%" }}>
                Ingresar con Google
            </button>

            <p className="welcome-text" style={{ marginTop: "15px" }}>
                ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
        </div>
    );
};