import React, { useState } from "react";
import { Task } from "../types";
import { updateTask } from "../services/tasks";

interface TodoListProps {
    tasks: Task[];
    onToggleTask: (task: Task) => Promise<void>;
    onRemoveTask: (taskId: string) => Promise<void>;
}

interface TodoItemProps {
    task: Task;
    onToggleTask: (task: Task) => Promise<void>;
    onRemoveTask: (taskId: string) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggleTask, onRemoveTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || "");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!title.trim()) return;
        try {
            setLoading(true);
            await updateTask(task.id, {
                title: title.trim(),
                description: description.trim(),
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setTitle(task.title);
        setDescription(task.description || "");
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <li
                style={{
                    border: "1px solid #0070f3",
                    borderRadius: "5px",
                    padding: "10px",
                    marginBottom: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                }}
            >
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título de la tarea"
                    style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción (opcional)"
                    style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc", resize: "vertical" }}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={handleSave} disabled={loading}>
                        {loading ? "Guardando..." : "Guardar"}
                    </button>
                    <button onClick={handleCancel} disabled={loading}>
                        Cancelar
                    </button>
                </div>
            </li>
        );
    }

    return (
        <li
            style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textDecoration: task.completed ? "line-through" : "none",
                opacity: task.completed ? 0.6 : 1,
            }}
        >
            <div>
                <strong>{task.title}</strong>
                {task.description && <p style={{ margin: "5px 0 0" }}>{task.description}</p>}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setIsEditing(true)}>Editar</button>
                <button onClick={() => onToggleTask(task)}>
                    {task.completed ? "Desmarcar" : "Completar"}
                </button>
                <button onClick={() => onRemoveTask(task.id)} style={{ color: "red" }}>
                    Eliminar
                </button>
            </div>
        </li>
    );
};

export const TodoList: React.FC<TodoListProps> = ({ tasks, onToggleTask, onRemoveTask }) => {
    if (tasks.length === 0) {
        return <p>No tienes tareas registradas todavía.</p>;
    }

    return (
        <ul style={{ listStyle: "none", padding: 0 }}>
            {tasks.map((task) => (
                <TodoItem
                    key={task.id}
                    task={task}
                    onToggleTask={onToggleTask}
                    onRemoveTask={onRemoveTask}
                />
            ))}
        </ul>
    );
};