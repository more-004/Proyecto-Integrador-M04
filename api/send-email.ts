import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { email, tasks } = req.body;

    if (!email || !tasks) {
        return res.status(400).json({ error: 'Faltan parámetros (email o tareas)' });
    }

    const tasksList = tasks
        .map((t: any) => `- ${t.title || t.titulo}: ${t.completed ? 'Completada' : 'Pendiente'}`)
        .join('\n');

    const params = {
        Source: process.env.SENDER_EMAIL || 'moreledesma10@gmail.com',
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Subject: { Data: 'Resumen de Tareas Pendientes' },
            Body: {
                Text: { Data: `Hola! Aquí tienes el resumen de tus tareas:\n\n${tasksList}` },
            },
        },
    };

    try {
        const command = new SendEmailCommand(params);
        await sesClient.send(command);
        return res.status(200).json({ success: true, message: 'Email enviado correctamente' });
    } catch (error: any) {
        console.error('Error enviando email via SES:', error);
        return res.status(500).json({ error: 'Error al enviar el email vía AWS SES' });
    }
}