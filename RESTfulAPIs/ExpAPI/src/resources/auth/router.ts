import { Router } from "express";
import { signup,logout,login } from "./controller";

const router = Router();

router.post("/signup", signup)
router.post("/logout", logout)
router.post("/login", login)

export default router;