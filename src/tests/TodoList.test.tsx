import React, { useState } from 'react';
import { Task } from '../types';

interface TodoListProps {
    tasks: Task[];
    onToggleTask: (id: string, completed: boolean) => void;
    onRemoveTask: (id: string) => void;
    onUpdateTask?: (id: string, updatedTask: Partial<Task>) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
    tasks,
    onToggleTask,
    onRemoveTask,
    onUpdateTask,
}) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const handleStartEdit = (task: Task) => {
        setEditingId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description || '');
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditTitle('');
        setEditDescription('');
    };

    const handleSaveEdit = async (id: string) => {
        if (!editTitle.trim()) return;
        if (onUpdateTask) {
            await onUpdateTask(id, {
                title: editTitle.trim(),
                description: editDescription.trim(),
            });
        }
        setEditingId(null);
    };

    if (tasks.length === 0) {
        return <p className="welcome-text">No hay tareas registradas.</p>;
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <li key={task.id} className="task-item">
                    {editingId === task.id ? (
                        <div style={{ width: '100%' }}>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Título de la tarea"
                            />
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="Descripción (opcional)"
                            />
                            <div className="task-actions">
                                <button className="btn-primary" onClick={() => handleSaveEdit(task.id)}>
                                    Guardar
                                </button>
                                <button className="btn-secondary" onClick={handleCancelEdit}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="task-info">
                                <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.title}
                                </h3>
                                {task.description && <p>{task.description}</p>}
                            </div>
                            <div className="task-actions">
                                <button className="btn-secondary" onClick={() => handleStartEdit(task)}>
                                    Editar
                                </button>
                                <button className="btn-secondary" onClick={() => onToggleTask(task.id, task.completed)}>
                                    {task.completed ? 'Desmarcar' : 'Completar'}
                                </button>
                                <button className="btn-danger" onClick={() => onRemoveTask(task.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};