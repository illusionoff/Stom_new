import {Router} from "express"
const router = new Router()
import {userController} from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import {body} from "express-validator"

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:3, max:32}),
    userController.registration)

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({min:3, max:32}),
    userController.login)

router.get('/auth', authMiddleware, userController.check)

router.get('/activate/:link', userController.activate)

export default router