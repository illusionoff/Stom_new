import { Router } from "express"
const router = new Router()
import { courseController } from "../controllers/courseController.js"
// import authMiddleware from "../middleware/authMiddleware.js"
import { body } from "express-validator"

const aboveZero = (value) => {
  if (value < 1) return false
  return true
}

router.post('/addCourse',// addCourseRouter
  body('name')
    .isLength({ min: 3, max: 200 })
    .withMessage("Вы ввели имя курса рисунка меньше 3 символов или более 200 символов"),
  body('time')
    .isNumeric()
    .custom((value) => aboveZero(value))
    .withMessage("Вы ввели продолжительность курса меньше 1 минуты "),
  body('lectionsCounter')
    .isNumeric()
    .custom((value) => aboveZero(value))
    .withMessage("Вы ввели количество лекций в курсе меньше одной "),
  body('price')
    .isNumeric()
    .custom((value) => aboveZero(value))
    .withMessage("Вы ввели цену курса меньше одного "),
  courseController.addCourse
)

router.get('/getAllCourses', courseController.getAllCourses) //getAllCourses
router.get('/:id', courseController.getOneCourse) //getOneCourse

export default router