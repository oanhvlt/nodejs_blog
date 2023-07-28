const exp = require('express');
const router = exp.Router();
const coursesController = require('../app/controllers/CoursesController');

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);

//slug page phải gọi sau cùng
router.get('/:slug', coursesController.show);

module.exports = router;

