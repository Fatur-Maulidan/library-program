const {body} = require('express-validator');

const validateMemberData = [
    body('name').notEmpty().withMessage('Name is required').bail()
        .isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
]

module.exports = {
    validateMemberData
}