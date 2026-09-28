export const sendEmailSummary = async (toEmail: string, tasks: any[]) => {
    const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: toEmail,
            tasks: tasks,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar el correo');
    }

    return await response.json();
};