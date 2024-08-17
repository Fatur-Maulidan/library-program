const {validationResult} = require("express-validator");

const checkIfDataIsCorrect = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status : 422,
            message : 'Bad Request',
            errors : errors.array()
        });
    }
    next();
}

module.exports = {
    checkIfDataIsCorrect
}