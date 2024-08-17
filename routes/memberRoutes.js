var express = require('express');
const MemberController = require('../controllers/memberControllers');
var router = express.Router();

router.get('/member', MemberController.index);
router.post('/member', MemberController.store);
router.put('/member/:code', MemberController.update);
router.put('/member/:code/Inactive', MemberController.destroy);

module.exports = router;
