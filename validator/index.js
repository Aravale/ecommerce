const { check } = require('express-validator');

exports.userSignupValidator =  [
     check('name', 'Name is required').notEmpty(),
     check('email', 'bw 3 32')
        .isEmail()
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        }),
    check('password', 'password is required').notEmpty(),
    check('password')
        .isLength({ min: 6 })
        .withMessage("at least 6 characters")
        .matches(/\d/)
        .withMessage("password must contain number")
    ]