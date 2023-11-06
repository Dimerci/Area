import { Router } from "express";
import { getNorris } from "./postNorris";

const express = require("express");
const router = Router();

router.use(express.json());
router.get("/", getNorris);

export default router;
