const Router = require('express');
const router = Router();

const { getCourses, createCourse, getCourseForAlumn, getCoursesForTeacher } = require('../Controllers/CourseController');

router.route('/')
    .get(getCourses)
    .post(createCourse);

router.route('/student/:studentid')
    .get(getCourseForAlumn);

router.route('/teacher/:id')
    .get(getCoursesForTeacher);

module.exports = router;