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
        return <p>No hay tareas registradas.</p>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tasks.map((task) => (
                <div
                    key={task.id}
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {editingId === task.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
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
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button onClick={() => handleSaveEdit(task.id)}>Guardar</button>
                                <button onClick={handleCancelEdit}>Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h4 style={{ margin: 0, textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.title}
                                </h4>
                                {task.description && (
                                    <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>
                                        {task.description}
                                    </p>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button onClick={() => handleStartEdit(task)}>
                                    Editar
                                </button>
                                <button onClick={() => onToggleTask(task.id, task.completed)}>
                                    {task.completed ? 'Desmarcar' : 'Completar'}
                                </button>
                                <button onClick={() => onRemoveTask(task.id)} style={{ color: 'red' }}>
                                    Eliminar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};