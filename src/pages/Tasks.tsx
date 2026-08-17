import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { logoutUser } from "../services/auth";
import { sendTaskSummaryEmail } from "../services/email";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";

export const Tasks: React.FC = () => {
    const { user } = useAuth();
    const { tasks, loading, error, addTask, toggleTask, removeTask } = useTasks(user?.uid);
    const [emailSending, setEmailSending] = useState(false);
    const [emailStatus, setEmailStatus] = useState<string | null>(null);

    const handleSendEmail = async () => {
        if (!user?.email) return;
        setEmailSending(true);
        setEmailStatus(null);
        try {
            await sendTaskSummaryEmail(user.email, tasks);
            setEmailStatus("¡Resumen enviado con éxito a tu email!");
        } catch (err) {
            setEmailStatus("Error al enviar el resumen por email.");
        } finally {
            setEmailSending(false);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2>Gestión de Tareas</h2>
                <button onClick={() => logoutUser()}>Cerrar Sesión</button>
            </header>

            <p>Bienvenido/a, <strong>{user?.email}</strong></p>

            {/* Botón para activar la función de envío por email */}
            <button
                onClick={handleSendEmail}
                disabled={emailSending || tasks.length === 0}
                style={{ marginBottom: "20px", padding: "10px", width: "100%", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
                {emailSending ? "Enviando email..." : "Enviar resumen por email"}
            </button>

            {emailStatus && <p style={{ color: emailStatus.includes("Error") ? "red" : "green" }}>{emailStatus}</p>}

            <TodoForm onAddTask={addTask} />

            {loading ? (
                <p>Cargando tareas...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <TodoList tasks={tasks} onToggleTask={toggleTask} onRemoveTask={removeTask} />
            )}
        </div>
    );
};