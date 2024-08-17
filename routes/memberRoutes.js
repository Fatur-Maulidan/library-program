var express = require('express');
const MemberController = require('../controllers/memberControllers');
var router = express.Router();

router.get('/member', MemberController.index);
router.post('/member', MemberController.store);

module.exports = router;
