const exp = require('express');
const router = exp.Router();
const coursesController = require('../app/controllers/CoursesController');

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.get('/:id/edit', coursesController.edit);
router.post('/handle-form-actions', coursesController.handleFormActions);

router.put('/:id', coursesController.update);
router.put('/:id/softDelete', coursesController.softDelete); //đưa course vào thùng rác: thêm deleted: true và deletedAt
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id/force', coursesController.forceDelete);

//slug page phải gọi sau cùng
router.get('/:slug', coursesController.show);

module.exports = router;

