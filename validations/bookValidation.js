const {body} = require('express-validator');

const validationBookData = [
    body('code').notEmpty().withMessage('Code is required').bail()
        .isLength({}).withMessage('Code must be at least 3 characters long'),
    body('title').notEmpty().withMessage('Title is required').bail()
        .isLength({min: 3}).withMessage('Title must be at least 3 characters long'),
    body('author').notEmpty().withMessage('Author is required').bail()
        .isLength({min: 3}).withMessage('Author must be at least 3 characters long')
]

module.exports = {
    validationBookData
}