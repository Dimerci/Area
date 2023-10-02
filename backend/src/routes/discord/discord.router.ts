import { Router } from 'express';
import postToDiscordWebhook from './postDiscord'; // Use the default export syntax


const discord_webhook_url = 'https://discord.com/api/webhooks/1158339425093296209/OJ0GSO8aLOkWXPQ51YREeE6CNZeCgpJ0sNAh84jUcJrCHSS8mNvGkyIwaiR6qdRDN4bM';
const message = 'Hello World!';

const router = Router();

// Define a route that invokes the function when accessed
router.get('/', (req, res) => {
  postToDiscordWebhook(discord_webhook_url, message)
    .then(() => {
      res.status(200).json({ message: 'Message sent successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to send message to Discord webhook' });
    });
});

export default router;