const exp = require('express');
const router = exp.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;

