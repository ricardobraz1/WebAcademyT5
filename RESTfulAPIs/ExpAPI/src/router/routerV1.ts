import { Router } from "express";
import productRouter from "../resources/product/router"
import cookiesRouter from "../resources/language/router"
import authRouter from "../resources/auth/router"
import userRouter from "../resources/user/router"

const router = Router()

router.use('/products', productRouter);
router.use('/cookies', cookiesRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;