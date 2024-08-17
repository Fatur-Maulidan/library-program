var express = require('express');
const MemberController = require('../controllers/memberControllers');
var router = express.Router();
const {validateMemberData} = require('../validations/memberValidations');
const {checkIfDataIsCorrect} = require('../helpers/checkStatusValidation');

router.get('/', MemberController.index);
router.post('/', validateMemberData, checkIfDataIsCorrect, MemberController.store);
router.put('/:code', validateMemberData, checkIfDataIsCorrect, MemberController.update);
router.put('/:code/:status', MemberController.destroy);

module.exports = router;
