const bcrypt = require('bcryptjs');
const express = require('express');
const handler = require('express-async-handler');
const { User } = require('../db/models');

const router = express.Router();

router.post(
    '/',
    // handleValidationErrors,
    handler(async (req, res) => {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, hashedPassword });
        res.status(201).json({
            user: { id: user.id }
        });
    }));

module.exports = router;