import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where
} from "firebase/firestore";
import { db } from "./firebase";
import { Task } from "../types";

const COLLECTION_NAME = "tasks";

// Obtener las tareas del usuario autenticado
export const getTasksByUser = async (userId: string): Promise<Task[]> => {
    const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];
    querySnapshot.forEach((document) => {
        tasks.push({ id: document.id, ...document.data() } as Task);
    });
    return tasks;
};

// Crear una nueva tarea
export const createTask = async (task: Omit<Task, "id">): Promise<string> => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), task);
    return docRef.id;
};

// Actualizar una tarea (título, descripción o estado)
export const updateTask = async (taskId: string, data: Partial<Task>): Promise<void> => {
    const taskDoc = doc(db, COLLECTION_NAME, taskId);
    await updateDoc(taskDoc, data);
};

// Eliminar una tarea
export const deleteTask = async (taskId: string): Promise<void> => {
    const taskDoc = doc(db, COLLECTION_NAME, taskId);
    await deleteDoc(taskDoc);
};