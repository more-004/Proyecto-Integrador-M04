import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from 'firebase/firestore';
import { Task } from '../types';

export const useTasks = (userId?: string) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setTasks([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const q = query(collection(db, 'tasks'), where('userId', '==', userId));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const fetchedTasks: Task[] = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...(docSnap.data() as Omit<Task, 'id'>),
                }));
                setTasks(fetchedTasks);
                setLoading(false);
            },
            (err) => {
                console.error('Error escuchando tareas:', err);
                setError('Error al obtener las tareas en tiempo real.');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [userId]);

    const addTask = async (title: string, description?: string) => {
        if (!userId) return;
        try {
            await addDoc(collection(db, 'tasks'), {
                title,
                description: description || '',
                completed: false,
                userId,
                createdAt: serverTimestamp(),
            });
        } catch (err) {
            console.error('Error al agregar tarea:', err);
        }
    };

    const toggleTask = async (id: string, currentStatus: boolean) => {
        try {
            const taskRef = doc(db, 'tasks', id);
            await updateDoc(taskRef, { completed: !currentStatus });
        } catch (err) {
            console.error('Error al cambiar estado de tarea:', err);
        }
    };

    const removeTask = async (id: string) => {
        try {
            const taskRef = doc(db, 'tasks', id);
            await deleteDoc(taskRef);
        } catch (err) {
            console.error('Error al eliminar tarea:', err);
        }
    };

    const updateTask = async (id: string, updatedTask: Partial<Task>) => {
        try {
            const taskRef = doc(db, 'tasks', id);
            await updateDoc(taskRef, updatedTask);
        } catch (err) {
            console.error('Error al actualizar tarea:', err);
        }
    };

    return {
        tasks,
        loading,
        error,
        addTask,
        toggleTask,
        removeTask,
        updateTask,
    };
};