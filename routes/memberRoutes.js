var express = require('express');
const MemberController = require('../controllers/memberControllers');
var router = express.Router();

router.get('/member', MemberController.index);

module.exports = router;
