const express = require('express');
const router = express.Router();

const sessionRouter = require('./session');
const usersRouter = require('./users')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

module.exports = router;
