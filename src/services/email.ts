import { Task } from "../types";

export const sendTaskSummaryEmail = async (email: string, tasks: Task[]): Promise<void> => {
    const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, tasks }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || "Falló el envío del correo electrónico");
    }
};