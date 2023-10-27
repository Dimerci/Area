import express from "express";
import AboutJson from "./routes/aboutJson/";
import Weather from "./routes/weather";
import Discord from "./routes/discord";
import { errorHandler } from "./middleware/errors/ErrorHandler";
import { auth, ConfigParams } from "express-openid-connect";
import express from "express";
import AboutJson from "./routes/aboutJson/";
import Weather from "./routes/weather";
import Discord from "./routes/discord";
import User from "./routes/user";
import { errorHandler } from "./middleware/errors/ErrorHandler";
import { auth, ConfigParams } from "express-openid-connect";

const app = express();
const port = 8080;
const cors = require("cors");

app.use("/about.json", AboutJson);
app.use("/discord", Discord);
app.use("/weather", Weather);
app.use(cors());
connectToDatabase();

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
const config: ConfigParams = {
    authRequired: false,
    auth0Logout: true,
    secret: "a long, randomly-generated string stored in env",
    baseURL: "http://localhost:8080",
    clientID: "EeIDOpDIYLzrQc04tgmkr8r2nyNIVZqF",
    issuerBaseURL: "https://dev-zqudvtrv6sw7xe6c.us.auth0.com",
    authorizationParams: {
        redirect_uri: "http://localhost:8080/callback",
    },
    afterCallback: (req, res, session, state) => {
        res.redirect("http://localhost:8081/inside");
        return session;
    },
};

app.use(auth(config));
app.use("/about.json", AboutJson);
app.use("/discord", Discord);
app.use("/weather", Weather);
app.use("/about.json", AboutJson);
app.use("/discord", Discord);
app.use("/weather", Weather);
app.use("/user", User);

app.get("/", (req, res) => {
    console.log("Here");
    res.send("Hello world");
});

app.get("/callback", (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.redirect("http://localhost:8081"); // Redirect to frontend after successful authentication
    } else {
        res.send("Authentication failed");
    }
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
