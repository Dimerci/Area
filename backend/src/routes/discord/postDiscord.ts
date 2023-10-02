
async function postToDiscordWebhook(webhookURL: string, message: string) {
    try {
        const params = {
            content: message,
        };
        const { default: fetch } = await import('node-fetch');
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
            });

        if (response.ok) {
            console.log('Message sent successfully to Discord webhook.');
        } else {
            console.error('Failed to send message to Discord webhook.');
        }
    } catch (error) {
        console.error('An error occurred while sending the message:', error);
    }
}

export default postToDiscordWebhook;