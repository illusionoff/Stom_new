import { ApiError } from "../error/ApiError.js";
import { models } from "../models/models.js"
import { v4 as uuidv4 } from 'uuid'
import { validationResult } from "express-validator";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class CourseController {
  async addCourse(req, res, next) {
    try {
      const { name, time, lectionsCounter, price } = req.body;
      const { image } = req.files;

      if (!image) return next(ApiError.badRequest('Некорректный image'));
      if (!name) return next(ApiError.badRequest('Некорректный name'));
      if (!time) return next(ApiError.badRequest('Некорректный time'));
      if (!lectionsCounter) return next(ApiError.badRequest('Некорректный lectionsCounter'));
      if (!price) return next(ApiError.badRequest('Некорректный price'));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest(errors.array()[0].msg))
      }
      const fileName = uuidv4() + '.jpg';
      console.log('__dirname=', __dirname);
      image.mv(path.resolve(__dirname, '..', 'static', fileName));
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

  async getAllCourses(req, res, next) {
    try {
      let courses;
      courses = await models.Course.findAll();
      res.json(courses);
    } catch (err) {
      console.log('🚀🚀🚀-error: ', err);
      next(ApiError.badRequest(err.message));
    }
  }

  async getOneCourse(req, res, next) {
    try {
      const { id } = req.params;
      const course = await models.Course.findOne({ where: { id } });
      res.json(course);
    } catch (err) {
      console.log('🚀🚀🚀-error: ', err);
      next(ApiError.badRequest(err.message));
    }
  }
}

export const courseController = new CourseController()
