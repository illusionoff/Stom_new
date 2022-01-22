import { ApiError } from "../error/ApiError.js";
import { models } from "../models/models.js"
import jwt from 'jsonwebtoken'
import { mail } from '../service/mail-servise.js'
import { v4 as uuidv4 } from 'uuid'
import { validationResult } from "express-validator";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




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
      const { name, time, lectionsCounter, price } = req.body;
      const { image } = req.files;
      const fileName = uuidv4() + '.jpg';
      console.log('__dirname=', __dirname);
      image.mv(path.resolve(__dirname, '..', 'static', fileName));

      if (!image) return next(ApiError.badRequest('Некорректный image'));
      if (!name) return next(ApiError.badRequest('Некорректный name'));
      if (!time) return next(ApiError.badRequest('Некорректный time'));
      if (!lectionsCounter) return next(ApiError.badRequest('Некорректный lectionsCounter'));
      if (!price) return next(ApiError.badRequest('Некорректный price'));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest(errors.array()[0].msg))
      }
      // const id = uuidv4();
      const course = await models.Course.create({
        // id,
        image: fileName,
        name,
        time,
        lectionsCounter,
        price
      });
      console.log("course result BD=+++++++++++++++++++++++++++", course);
      // return res.json({token, email: user.email, firstName: user.firstName, lastName: user.lastName})
      // return res.json({ image: course.image, name: course.name, time: course.time, lectionsCounter: course.lectionsCounter, price: course.price })
      return res.json(course);
      // res.json({ image, name, time, lectionsCounter, price });
    } catch (err) {
      console.log('🚀🚀🚀-error: ', err);
      next(ApiError.badRequest(err.message));
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
