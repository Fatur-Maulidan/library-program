var express = require('express');
const BookController = require('../controllers/bookControllers');
var router = express.Router();

router.get('/', BookController.index);
router.post('/', BookController.store);
router.put('/:code', bookController.update);
// router.put('/book/:code/Inactive', bookController.destroy);

module.exports = router;
