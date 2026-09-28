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
        throw new Error("Falló el envío del correo electrónico");
    }
};