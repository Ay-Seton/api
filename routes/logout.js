import express from "express"
import { logOut } from "../controllers/logout.js    ";

const router = express.Router();

router.get("/", logOut );

export default router;