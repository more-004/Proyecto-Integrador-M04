
import { Task } from "../types";

export const sendTaskSummaryEmail = async (email: string, tasks: Task[]): Promise<boolean> => {
    const response = await fetch("/api/send-summary", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, tasks }),
    });

    if (!response.ok) {
        throw new Error("No se pudo enviar el correo electrónico.");
    }

    return true;
};