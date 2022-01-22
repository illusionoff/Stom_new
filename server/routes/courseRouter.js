import { Router } from "express"
const router = new Router()
import { courseController } from "../controllers/courseController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import { body } from "express-validator"

router.post('/addCourse',// addCourseRouter
  // body('image')
  //   .isLength({ min: 3, max: 50 })
  //   .withMessage("Вы ввели  название рисунка курса меньше трех символов или более 50 символов"),
  body('name')
    .isLength({ min: 5, max: 200 })
    .withMessage("Вы ввели имя курса рисунка меньше 5 символов или более 200 символов"),
  body('time')
    .isNumeric()
    // .isLength({ min: 1 })
    .withMessage("Вы ввели продолжительность курса меньше 1 минуты "),
  body('lectionsCounter')
    .isNumeric()
    // .isLength({ min: 1 })
    .withMessage("Вы ввели количество лекций в курсе меньше одной "),
  body('price')
    .isNumeric()
    // .isLength({ min: 1 })
    .withMessage("Вы ввели цену курса меньше одного "),
  courseController.addCourse
)

router.get('/getCourses',
  // body('image').isLength({ min: 3, max: 50 }),
  // body('name').isLength({ min: 5, max: 200 }),
  // body('time')
  //   .isNumeric()
  //   .isLength({ min: 1, }),
  // body('lectionsCounter').isLength({ min: 1 }),
  // body('price')
  //   .isNumeric()
  //   .withMessage("Введите корректный номер категории")
  //   .isLength({ min: 1 }),
  courseController.getCourses

) //getAllCourses
// router.post('/:id',)// getOneCourse

// router.post('/login',
//     body('email').isEmail(),
//     body('password').isLength({min:3, max:32}),
//     userController.login)

// router.get('/auth', authMiddleware, userController.check)

// router.get('/activate/:link', userController.activate)

export default router