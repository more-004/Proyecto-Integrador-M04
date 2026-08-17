import React, { useState } from "react";

interface TodoFormProps {
    onAddTask: (title: string, description: string) => Promise<void>;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            await onAddTask(title, description);
            setTitle("");
            setDescription("");
        } catch (err) {
            console.error("Error al agregar tarea:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <h3>Agregar Nueva Tarea</h3>
            <input
                type="text"
                placeholder="Título de la tarea..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ padding: "8px", fontSize: "16px" }}
            />
            <textarea
                placeholder="Descripción (opcional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                style={{ padding: "8px", fontSize: "16px" }}
            />
            <button type="submit" disabled={loading} style={{ padding: "10px", cursor: "pointer" }}>
                {loading ? "Guardando..." : "Guardar Tarea"}
            </button>
        </form>
    );
};