var express = require('express');
const bookController = require('../controllers/bookControllers');
var router = express.Router();

router.get('/', bookController.index);
// router.post('/book', bookController.store);
// router.put('/book/:code', bookController.update);
// router.put('/book/:code/Inactive', bookController.destroy);

module.exports = router;
