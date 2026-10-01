import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { logoutUser } from "../services/auth";
import { sendTaskSummaryEmail } from "../services/email";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";

export const Tasks: React.FC = () => {
    const { user } = useAuth();
    const { tasks, loading, error, addTask, toggleTask, removeTask, updateTask } = useTasks(user?.uid);
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
        <div className="container">
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ margin: 0 }}>Gestión de Tareas</h2>
                <button className="btn-danger" onClick={() => logoutUser()}>
                    Cerrar Sesión
                </button>
            </header>

            <p className="welcome-text">
                Bienvenido/a, <strong>{user?.email}</strong>
            </p>

            <button
                className="btn-secondary"
                onClick={handleSendEmail}
                disabled={emailSending || tasks.length === 0}
                style={{ marginBottom: "20px", width: "100%" }}
            >
                {emailSending ? "Enviando email..." : "Enviar resumen por email"}
            </button>

            {emailStatus && (
                <p style={{ color: emailStatus.includes("Error") ? "#e74c3c" : "#2ecc71", marginBottom: "15px" }}>
                    {emailStatus}
                </p>
            )}

            <TodoForm onAddTask={addTask} />

            {loading ? (
                <p className="welcome-text">Cargando tareas...</p>
            ) : error ? (
                <p style={{ color: "#e74c3c" }}>{error}</p>
            ) : (
                <TodoList
                    tasks={tasks}
                    onToggleTask={toggleTask}
                    onRemoveTask={removeTask}
                    onUpdateTask={updateTask}
                />
            )}
        </div>
    );
};