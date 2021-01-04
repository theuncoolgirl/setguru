const { check } = require('express-validator');
const { User } = require('../../db/models');

const emailSignUpValidator =
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .isLength({ max: 255 })
        .withMessage('Email address must not be more than 255 characters long')
        .custom((value) => {
            return User.findOne({ where: { email: value } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('The provided Email Address is already in use by another account');
                    }
                });
        })
        .normalizeEmail();

const emailValidator =
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .isLength({ max: 255 })
        .withMessage('Email address must not be more than 255 characters long')
        .normalizeEmail();

const passwordValidator =
    check('password')
        .not().isEmpty()
        .withMessage('Please provide a password')
        .isLength({ max: 60 })
        .withMessage('Password must not be more than 60 characters long')

const userNameValidator =
    check('userName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a user name')
        .isLength({ max: 255 })
        .withMessage('User name must be less then 255 characters')

const validateSignup = [
    userNameValidator,
    emailSignUpValidator,
    passwordValidator,
]

const validateLogin = [
    emailValidator,
    passwordValidator
]

module.exports = {
    validateSignup,
    validateLogin
}