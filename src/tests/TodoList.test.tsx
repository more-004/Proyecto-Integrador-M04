import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { TodoList } from '../components/TodoList';
import { Task } from '../types';

describe('TodoList component', () => {
    const mockTasks: Task[] = [
        {
            id: '1',
            title: 'Tarea 1',
            description: 'Descripción 1',
            completed: false,
            userId: 'user-1',
            createdAt: new Date(),
        },
        {
            id: '2',
            title: 'Tarea 2',
            description: '',
            completed: true,
            userId: 'user-1',
            createdAt: new Date(),
        },
    ];

    it('renders empty message when no tasks are present', () => {
        render(
            <TodoList
                tasks={[]}
                onToggleTask={vi.fn()}
                onRemoveTask={vi.fn()}
            />
        );
        expect(screen.getByText('No hay tareas registradas.')).toBeInTheDocument();
    });

    it('renders task list items properly', () => {
        render(
            <TodoList
                tasks={mockTasks}
                onToggleTask={vi.fn()}
                onRemoveTask={vi.fn()}
            />
        );
        expect(screen.getByText('Tarea 1')).toBeInTheDocument();
        expect(screen.getByText('Descripción 1')).toBeInTheDocument();
        expect(screen.getByText('Tarea 2')).toBeInTheDocument();
        expect(screen.getByText('Completar')).toBeInTheDocument();
        expect(screen.getByText('Desmarcar')).toBeInTheDocument();
    });

    it('calls onToggleTask when toggle button is clicked', () => {
        const handleToggle = vi.fn();
        render(
            <TodoList
                tasks={mockTasks}
                onToggleTask={handleToggle}
                onRemoveTask={vi.fn()}
            />
        );
        fireEvent.click(screen.getByText('Completar'));
        expect(handleToggle).toHaveBeenCalledWith('1', false);
    });

    it('calls onRemoveTask when remove button is clicked', () => {
        const handleRemove = vi.fn();
        render(
            <TodoList
                tasks={mockTasks}
                onToggleTask={vi.fn()}
                onRemoveTask={handleRemove}
            />
        );
        const removeButtons = screen.getAllByText('Eliminar');
        fireEvent.click(removeButtons[0]);
        expect(handleRemove).toHaveBeenCalledWith('1');
    });

    it('enters edit mode and calls onUpdateTask on save', async () => {
        const handleUpdate = vi.fn();
        render(
            <TodoList
                tasks={mockTasks}
                onToggleTask={vi.fn()}
                onRemoveTask={vi.fn()}
                onUpdateTask={handleUpdate}
            />
        );
        const editButtons = screen.getAllByText('Editar');
        fireEvent.click(editButtons[0]);

        const titleInput = screen.getByPlaceholderText('Título de la tarea');
        fireEvent.change(titleInput, { target: { value: 'Tarea 1 Modificada' } });

        const saveButton = screen.getByText('Guardar');
        fireEvent.click(saveButton);

        expect(handleUpdate).toHaveBeenCalledWith('1', {
            title: 'Tarea 1 Modificada',
            description: 'Descripción 1',
        });
    });
});