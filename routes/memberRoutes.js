var express = require('express');
const MemberController = require('../controllers/memberControllers');
var router = express.Router();

router.get('/member', MemberController.index);
router.post('/member', MemberController.store);
router.put('/member/:code', MemberController.update);
router.delete('/member/:code', MemberController.destroy);

module.exports = router;
