import express from 'express';
import AboutJson from './routes/aboutJson/';
import Weather from './routes/weather';
import Discord from './routes/discord';
import User from './routes/user'
import Norris from './routes/chuckNorris'
import MealDb from './routes/mealDb'
import clock from './routes/clock';
import { errorHandler } from './middleware/errors/ErrorHandler';
import { connectToDatabase, Client } from './database/connectToDb';
import { readListingByName, createListing, updateListingByName, deleteListingByName, listDb } from './database/dbInteraction';
import { auth, ConfigParams } from 'express-openid-connect';
import 'dotenv/config';

const app = express();
const port = 8080;
const cors = require('cors');

app.use(cors());
connectToDatabase();

const config: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET || 'Iyw3zDnJFy6RcCftqkEB9dyzKYjke_Y3exF7IhNxSO_dWG31iO0Wt6K0RSKPFuCu',
  baseURL: 'http://localhost:8080',
  clientID: 'cx4hdbUF3doZRcilukkHUajuKYSdOFKA',
  issuerBaseURL: 'https://dev-zqudvtrv6sw7xe6c.us.auth0.com',
  authorizationParams:{
    redirect_uri: 'http://localhost:8080/callback',
  },
  afterCallback: (req, res, session, state) => {
    res.redirect('http://localhost:8081/inside');
    return session;
  }
};

app.use(auth(config));
app.use('/about.json', AboutJson);
app.use('/discord', Discord);
app.use('/weather', Weather);
app.use('/user', User);
app.use('/norris', Norris);
app.use('/mealDb', MealDb);
app.use('/clock', clock);


app.get("/", (req, res) => {console.log("Here"); res.send("Hello world")});

app.get("/callback", (req, res) => {
  console.log("Callback route hit");
  if (req.oidc.isAuthenticated()) {
    console.log("User is authenticated");
    res.redirect('http://localhost:8081');
  } else {
    console.log("Authentication failed");
    res.send("Authentication failed");
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.on('error', (err) => {
    console.error('Server error:', err);
});

app.use(errorHandler);
