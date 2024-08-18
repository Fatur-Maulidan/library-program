var express = require('express');
const BookController = require('../controllers/bookControllers');
var router = express.Router();
const {validationBookData} = require('../validations/bookValidation');
const {checkIfDataIsCorrect} = require('../helpers/checkStatusValidation');

// CRUD For Books
router.get('/', BookController.index);
router.post('/', validationBookData, checkIfDataIsCorrect, BookController.store);
router.put('/:code', validationBookData, checkIfDataIsCorrect, BookController.update);
router.delete('/:code', BookController.destroy);

// Task
router.put('/borrow/:code_member', BookController.borrowBook);
router.put('/return/:code', BookController.returnBook);


module.exports = router;
