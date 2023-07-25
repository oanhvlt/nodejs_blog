const exp = require('express');
const router = exp.Router();
const coursesController = require('../app/controllers/CoursesController');

router.get('/:slug', coursesController.show);

module.exports = router;

