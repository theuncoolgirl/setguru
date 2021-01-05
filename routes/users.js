const bcrypt = require('bcryptjs');
const express = require('express');
const asyncHandler = require('express-async-handler');
const { User } = require('../db/models');
const { validationResult } = require('express-validator');
const { validateSignup } = require('./utils/validators');

const router = express.Router();

router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        const { 
            username,
            email,
            password
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            hashedPassword
        });
        res.status(201).json({
            user: { id: user.id }
        });
    }));

router.get(
    '/:userId',
    asyncHandler(async (req, res) => {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        res.status(201).json({ user })
    })
)

module.exports = router;