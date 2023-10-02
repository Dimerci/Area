import { Router } from "express";
import { postWeather } from "./postWeather";

const express = require("express");
const router = Router();

router.use(express.json());

router.post("/", postWeather);

export default router;
