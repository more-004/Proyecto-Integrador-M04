export interface Task {
    id: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string; // ISO String para fácil formateo y almacenamiento
}

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
}

export type TaskFilter = 'all' | 'pending' | 'completed';