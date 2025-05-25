import express from "express";
import { accessToken, refreshToken } from "./auth.controller";

const router = express.Router();

router.post("/accesstoken", accessToken);
router.post("/refreshtoken", refreshToken);

export default router;
