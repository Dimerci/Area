import request from 'supertest';
import express from 'express';
import discordRouter from '../../routes/discord/discord.router';
import fetch, { Response, Headers as NodeFetchHeaders } from 'node-fetch';

const app = express();
app.use('/discord', discordRouter);

jest.mock('node-fetch');

describe('Discord Router', () => {
  it('should post to Discord', async () => {
    const message = 'Hello, Discord';
    const fetchMock = fetch as jest.MockedFunction<typeof fetch>;

    const response = await request(app)
      .post('/discord')
      .send({ message });

    expect(response.status).toBe(200);

    // Verify the fetch function was called with the expected arguments
    expect(fetchMock).toHaveBeenCalledWith(
      'https://discord.com/api/webhooks/your-webhook-url',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message,
        }),
      })
    );

    // Restore the original fetch function
    fetchMock.mockRestore();
  });
});
