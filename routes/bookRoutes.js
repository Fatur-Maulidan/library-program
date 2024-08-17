var express = require('express');
const BookController = require('../controllers/bookControllers');
var router = express.Router();
const {validationBookData} = require('../validations/bookValidation');
const {checkIfDataIsCorrect} = require('../helpers/checkStatusValidation');

router.get('/', BookController.index);
router.post('/', validationBookData, checkIfDataIsCorrect, BookController.store);
router.put('/:code', validationBookData, checkIfDataIsCorrect, BookController.update);
router.delete('/:code', BookController.destroy);

module.exports = router;
