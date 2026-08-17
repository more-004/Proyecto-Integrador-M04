import { useState, useEffect, useCallback } from "react";
import { Task } from "../types";
import {
    getTasksByUser,
    createTask,
    updateTask,
    deleteTask
} from "../services/tasks";

export const useTasks = (userId: string | undefined) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const data = await getTasksByUser(userId);
            setTasks(data);
        } catch (err: any) {
            setError("Error al cargar las tareas.");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const addTask = async (title: string, description: string) => {
        if (!userId) return;
        const newTask = {
            userId,
            title,
            description,
            completed: false,
            createdAt: new Date().toISOString(),
        };
        await createTask(newTask);
        await fetchTasks();
    };

    const toggleTask = async (task: Task) => {
        await updateTask(task.id, { completed: !task.completed });
        await fetchTasks();
    };

    const removeTask = async (taskId: string) => {
        await deleteTask(taskId);
        await fetchTasks();
    };

    return { tasks, loading, error, addTask, toggleTask, removeTask, refreshTasks: fetchTasks };
};