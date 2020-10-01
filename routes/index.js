const express = require('express');
const router = express.Router();

const sessionRouter = require('./session');
const usersRouter = require('./users');
const searchRouter = require('./search');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/search', searchRouter);

module.exports = router;
