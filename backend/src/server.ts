import express from "express";
import AboutJson from "./routes/aboutJson/";
import Weather from "./routes/weather";
import Discord from "./routes/discord";
import { errorHandler } from "./middleware/errors/ErrorHandler";
import { connectToDatabase, Client } from "./database/connectToDb";
import {
    readListingByName,
    createListing,
    updateListingByName,
    deleteListingByName,
    listDb,
} from "./database/dbInteraction";

const app = express();
const port = 8080;
const cors = require("cors");
// const { auth } = require('express-openid-connect');
const cors = require("cors");

app.use(cors()); // Move CORS up

app.use("/about.json", AboutJson);
app.use("/discord", Discord);
app.use("/weather", Weather);
app.use(cors());

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:8080',
//   clientID: 'EeIDOpDIYLzrQc04tgmkr8r2nyNIVZqF',
//   issuerBaseURL: 'https://dev-zqudvtrv6sw7xe6c.us.auth0.com'
// };

// app.use(auth(config));
app.use("/about.json", AboutJson);
app.use("/discord", Discord);
app.use("/weather", Weather);

app.get("/", (req, res) => {
    console.log("Here");
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Server is running on port ${port}`);
});

app.on("error", (err) => {
    console.error("Server error:", err);
});

app.on("error", (err) => {
    console.error("Server error:", err);
});

app.use(errorHandler);
