import React from "react";
import { Task } from "../types";

interface TodoListProps {
    tasks: Task[];
    onToggleTask: (task: Task) => Promise<void>;
    onRemoveTask: (taskId: string) => Promise<void>;
}

export const TodoList: React.FC<TodoListProps> = ({ tasks, onToggleTask, onRemoveTask }) => {
    if (tasks.length === 0) {
        return <p>No tienes tareas registradas todavía.</p>;
    }

    return (
        <ul style={{ listStyle: "none", padding: 0 }}>
            {tasks.map((task) => (
                <li
                    key={task.id}
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
                        <button onClick={() => onToggleTask(task)}>
                            {task.completed ? "Desmarcar" : "Completar"}
                        </button>
                        <button onClick={() => onRemoveTask(task.id)} style={{ color: "red" }}>
                            Eliminar
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};