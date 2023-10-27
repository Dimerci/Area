import request from 'supertest';
import express from 'express';
import aboutRouter from '../../routes/aboutJson/about.router';

const app = express();
app.use('/about.json', aboutRouter);

describe('About Route', () => {
  it('should return the correct JSON response', async () => {
    const response = await request(app).get('/about.json');

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect(response.body).toEqual({
        server: {
            service: [{
                name: "Weather",
                description: "Get the possibility to trigger an reaction depending of meterologic data"
            }],
            reaction: [{
                name: "Discord",
                description: "Send message to specific tchat"
            }]
        }
    });
  });
});
