import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TodoList } from '../components/TodoList';
import { Task } from '../types';

vi.mock('../services/tasks', () => ({
    updateTask: vi.fn(),
}));

const mockTasks = [
    {
        id: '1',
        title: 'Tarea de prueba M4',
        description: 'Descripción de prueba para el evaluador',
        completed: false,
        userId: 'user-123',
    },
] as Task[];

describe('Componente TodoList', () => {
    it('renderiza la lista de tareas correctamente con sus botones', () => {
        render(
            <TodoList
                tasks={mockTasks}
                onToggleTask={vi.fn()}
                onRemoveTask={vi.fn()}
            />
        );

        expect(screen.getByText('Tarea de prueba M4')).toBeInTheDocument();
        expect(screen.getByText('Descripción de prueba para el evaluador')).toBeInTheDocument();
        expect(screen.getByText('Editar')).toBeInTheDocument();
        expect(screen.getByText('Completar')).toBeInTheDocument();
        expect(screen.getByText('Eliminar')).toBeInTheDocument();
    });

    it('activa el modo de edición al hacer clic en el botón Editar', () => {
        render(
            <TodoList
                tasks={mockTasks}
                onToggleTask={vi.fn()}
                onRemoveTask={vi.fn()}
            />
        );

        const editButton = screen.getByText('Editar');
        fireEvent.click(editButton);

        expect(screen.getByPlaceholderText('Título de la tarea')).toBeInTheDocument();
        expect(screen.getByText('Guardar')).toBeInTheDocument();
        expect(screen.getByText('Cancelar')).toBeInTheDocument();
    });
});