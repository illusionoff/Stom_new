import {ApiError} from "../error/ApiError.js";
import bcrypt from "bcrypt"
import {models} from "../models/models.js"
import jwt from 'jsonwebtoken'
import {mail} from '../service/mail-servise.js'
import {v4 as uuidv4} from 'uuid'
import {validationResult} from "express-validator";


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}                                    //время жизни токена
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role, firstName, lastName} = req.body


            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest("Ошибка валидации", errors.array()))
            }
            if (!email || !password) return next(ApiError.badRequest('Некорректный email или password'))

            if (!firstName || !lastName) return next(ApiError.badRequest('Некорректный firstName или lastName'))

            const candidate = await models.User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }


            const hashPassword = await bcrypt.hash(password, 5)
            const activationLink = uuidv4()

            const user = await models.User.create({
                email,
                role,
                password: hashPassword,
                firstName,
                lastName,
                activationLink
            })

            await models.Basket.create({userId: user.id})

            const token = generateJwt(user.id, user.email, user.role)


            await mail.sendMailAction(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)

            return res.json({token, email: user.email, firstName: user.firstName, lastName: user.lastName})

        } catch (err) {
            console.log('🚀-error: ', err)
        }

    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await models.User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'))
            }

            let comparePassword = bcrypt.compareSync(password, user.password)    //сравниваю
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }

            const token = generateJwt(user.id, user.email, user.role)

            return res.json({token, email: user.email, firstName: user.firstName, lastName: user.lastName})

        } catch (err) {
            console.log('🚀🚀-error: ', err)
        }
    }

    async check(req, res, next) {
        try {
            const email = req.user.email
            const user = await models.User.findOne({where: {email}})

            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json({token, email: user.email, firstName: user.firstName, lastName: user.lastName})
        } catch (err) {
            console.log('🚀🚀🚀-error: ', err)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            const user = await models.User.findOne({activationLink})
            console.log('user', user)
            if (!user) {
                throw new Error('Неккоректная ссылка активации')
            }
            user.isActivated = true
            await user.save()

            return res.redirect(process.env.CLIENT_URL) //edit CLIENT_URL (react)

        } catch (e) {
            console.log('🚀🚀🚀🚀-error: ', e)
        }
    }
}

export const userController = new UserController()
