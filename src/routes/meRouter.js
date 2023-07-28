const exp = require('express');
const router = exp.Router();
const meController = require('../app/controllers/MeController');

router.get('/stored/courses', meController.storedCourses);


module.exports = router;

