import { Router } from "express"
const router = new Router()
import userRouter from "./userRouter.js";
import courseRouter from "./courseRouter.js";



router.use('/user', userRouter);
router.use('/course', courseRouter);


export default router