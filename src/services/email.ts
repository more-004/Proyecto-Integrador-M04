import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { Task } from "../types";

const env = (import.meta as any).env || {};

const sesClient = new SESClient({
    region: env.VITE_AWS_REGION || "us-east-2",
    credentials: {
        accessKeyId: env.VITE_AWS_ACCESS_KEY_ID || "",
        secretAccessKey: env.VITE_AWS_SECRET_ACCESS_KEY || "",
    },
});

export const sendTaskSummaryEmail = async (email: string, tasks: Task[]): Promise<boolean> => {
    const senderEmail = env.VITE_SENDER_EMAIL || "moreledesma10@gmail.com";

    const taskListText = tasks
        .map((t) => `- [${t.completed ? "X" : " "}] ${t.title}`)
        .join("\n");

    const command = new SendEmailCommand({
        Source: senderEmail,
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Subject: {
                Data: "Resumen de Tareas Pendientes",
                Charset: "UTF-8",
            },
            Body: {
                Text: {
                    Data: `Hola!\n\nAquí tienes tu lista de tareas actual:\n\n${taskListText}\n\n`,
                    Charset: "UTF-8",
                },
            },
        },
    });

    try {
        await sesClient.send(command);
        return true;
    } catch (error) {
        console.error("Error enviando email vía AWS SES:", error);
        throw new Error("No se pudo enviar el correo electrónico.");
    }
};