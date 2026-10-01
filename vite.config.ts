import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            react(),
            {
                name: 'local-api-send-email',
                configureServer(server) {
                    server.middlewares.use(async (req, res, next) => {
                        if (req.url === '/api/send-email' && req.method === 'POST') {
                            let body = '';
                            req.on('data', (chunk) => {
                                body += chunk;
                            });

                            req.on('end', async () => {
                                try {
                                    const { email, tasks } = JSON.parse(body || '{}');

                                    if (!email || !tasks) {
                                        res.statusCode = 400;
                                        res.setHeader('Content-Type', 'application/json');
                                        return res.end(JSON.stringify({ error: 'Faltan parámetros (email o tareas)' }));
                                    }

                                    const tasksList = tasks
                                        .map((t: any) => `- ${t.title || t.titulo}: ${t.completed ? 'Completada' : 'Pendiente'}`)
                                        .join('\n');

                                    const accessKeyId = env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '';
                                    const secretAccessKey = env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '';
                                    const region = env.AWS_REGION || process.env.AWS_REGION || 'us-east-2';
                                    const senderEmail = env.SENDER_EMAIL || process.env.SENDER_EMAIL || 'morevictoria290@gmail.com';

                                    const sesClient = new SESClient({
                                        region,
                                        credentials: {
                                            accessKeyId,
                                            secretAccessKey,
                                        },
                                    });

                                    const params = {
                                        Source: senderEmail,
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

                                    const command = new SendEmailCommand(params);
                                    await sesClient.send(command);

                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    return res.end(JSON.stringify({ success: true, message: 'Email enviado correctamente' }));
                                } catch (error: any) {
                                    console.error('Error enviando email via SES:', error);
                                    res.statusCode = 500;
                                    res.setHeader('Content-Type', 'application/json');
                                    return res.end(JSON.stringify({ error: error.message || 'Error al enviar el email vía AWS SES' }));
                                }
                            });
                            return;
                        }
                        next();
                    });
                },
            },
        ],
        test: {
            globals: true,
            environment: 'jsdom',
        },
    };
});