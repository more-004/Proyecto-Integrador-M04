import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";


const sesClient = new SESClient({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    const { email, tasks } = req.body;

    if (!email || !tasks) {
        return res.status(400).json({ error: "Faltan parámetros requeridos (email, tasks)" });
    }


    const taskListText = tasks
        .map((t: any, index: number) => `${index + 1}. [${t.completed ? "COMPLETADA" : "PENDIENTE"}] ${t.title}`)
        .join("\n");

    const emailParams = {
        Source: process.env.SENDER_EMAIL, // Email verificado en AWS SES
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Subject: {
                Data: "Resumen de tus tareas diarias - MateCode Todo App",
            },
            Body: {
                Text: {
                    Data: `Hola!\n\nEste es el resumen actual de tus tareas:\n\n${taskListText}\n\n¡Sigue así!`,
                },
            },
        },
    };

    try {
        const command = new SendEmailCommand(emailParams);
        await sesClient.send(command);
        return res.status(200).json({ success: true, message: "Email enviado con éxito" });
    } catch (error: any) {
        console.error("Error al enviar email via AWS SES:", error);
        return res.status(500).json({ error: "Error al enviar el email", details: error.message });
    }
}