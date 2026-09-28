import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Task } from '../types';

export const useTasks = (userId: string | undefined) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
                const fetchedTasks = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Task[];

                setTasks(fetchedTasks);
                setLoading(false);
            },
            (error) => {
                console.error('Error al escuchar tareas en tiempo real:', error);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, [userId]);

    return { tasks, loading };
};