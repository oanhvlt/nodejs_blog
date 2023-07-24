const exp = require('express');
const router = exp.Router();
const newsController = require('../app/controllers/NewsController');

router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;

