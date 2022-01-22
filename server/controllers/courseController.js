import { ApiError } from "../error/ApiError.js";
import { models } from "../models/models.js"
import jwt from 'jsonwebtoken'
import { mail } from '../service/mail-servise.js'
import { v4 as uuidv4 } from 'uuid'
import { validationResult } from "express-validator";




// const generateJwt = (id, email, role) => {
//     return jwt.sign(
//         {id, email, role},
//         process.env.SECRET_KEY,
//         {expiresIn: '24h'}                                    //время жизни токена
//     )
// }

class CourseController {
  async addCourse(req, res, next) {
    try {
      // const email = req.user.email
      // const user = await models.User.findOne({ where: { email } })

      // const token = generateJwt(req.user.id, req.user.email, req.user.role)
      // return res.json({ token, email: user.email, firstName: user.firstName, lastName: user.lastName })
      const { image, name, time, lectionsCounter, price } = req.body;
      res.json({ image, name, time, lectionsCounter, price });
    } catch (err) {
      console.log('🚀🚀🚀-error: ', err)
    }
  }

  async getCourses(req, res, next) {
    try {
      // const email = req.user.email
      // const user = await models.User.findOne({ where: { email } })

      // const token = generateJwt(req.user.id, req.user.email, req.user.role)
      // return res.json({ token, email: user.email, firstName: user.firstName, lastName: user.lastName })
      res.json({ message: 'Test working getCourses' });
    } catch (err) {
      console.log('🚀🚀🚀-error: ', err)
    }
  }

}

export const courseController = new CourseController()
