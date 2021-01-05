const express = require('express');
const asyncHandler = require('express-async-handler');
const { getUserToken } = require('./utils/auth');
const { validationResult } = require('express-validator');
const { validateLogin } = require('./utils/validators');
const { User } = require('../db/models');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.put(
    '/', 
    validateLogin,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            const err = new Error('Login failed');
            err.status = 404;
            err.title = 'Login failed';
            err.errors = ['No user with provided email found'];
            return next(err);
        }

        const match = await bcrypt.compare(password, user.hashedPassword.toString());

        if (!match) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['Invalid credentials'];
            return next(err);
        }

        const token = getUserToken(user);
        return res.status(201).json({
            token,
            userId: user.id
        });
}));

module.exports = router;