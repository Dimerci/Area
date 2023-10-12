import express from "express";
import AboutJson from "./routes/aboutJson/";
import Weather from "./routes/weather";
import Discord from "./routes/discord";
import { errorHandler } from "./middleware/errors/ErrorHandler";
import run from "./database/writeInDb";
import express from "express";
import AboutJson from "./routes/aboutJson/";
import Weather from "./routes/weather";
import Discord from "./routes/discord";
import { errorHandler } from "./middleware/errors/ErrorHandler";

const app = express();
const port = 8080;
const cors = require("cors");

app.use(cors()); // Move CORS up

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

run();

app.use(errorHandler);
