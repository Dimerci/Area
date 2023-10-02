// src/server.ts
import express from 'express';
import AboutJson from './routes/aboutJson/'
import Weather from './routes/weather'

const app = express();
const port = 8080;

app.use('/about.json', AboutJson);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
