import { ErrorStatus } from "../../../middleware/errors/ErrorStatus";

interface PostDiscordBody {
    message: string,
}

export async function PostRequestToDiscordBot({message}: PostDiscordBody) {
    const requestBody = {
        content: message
    };

    return await fetch('https://discord.com/api/webhooks/1158339425093296209/OJ0GSO8aLOkWXPQ51YREeE6CNZeCgpJ0sNAh84jUcJrCHSS8mNvGkyIwaiR6qdRDN4bM', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody),
        }).then((res) => {
            if (res.ok) {
                console.log('Message sent successfully to Discord webhook.');
            } else {
                throw new ErrorStatus("Error sending POST request to Discord bot", res.status);
            }
        }).catch((err) => {
            return {data: null, error:err};
        });
}