## Code Documentation

### 1. postDiscord Function

Handles the POST request to the Discord endpoint.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function

```typescript
import { Request, Response, NextFunction } from "express";
import { ErrorStatus } from "../../../middleware/errors/ErrorStatus";
import { PostRequestToDiscordBot } from "./postRequestToDiscordBot";

interface PostDiscordBody {
    message: string,
}

export async function postDiscord(req: Request<void, void, PostDiscordBody, void>, res: Response, next: NextFunction) {
    try {
        const field = "message";
        if (!(field in req.body)) {
            throw(new ErrorStatus(`Missing required field: ${field}`, 400));
        }

        const { message } = req.body;
        PostRequestToDiscordBot({message});

    } catch (err) {
        next(err);
    }
}
```
### 2. PostRequestToDiscordBot Function

* Sends a POST request to the Discord bot with the provided message.
* @param message - The message to be sent to the Discord bot

```typescript
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
```