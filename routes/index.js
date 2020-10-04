const express = require('express');
const router = express.Router();

const sessionRouter = require('./session');
const usersRouter = require('./users');
const searchRouter = require('./search');
const setlistRouter = require('./setlist');
const usersetlistsRouter = require('./usersetlists');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/search', searchRouter);
router.use('/setlist', setlistRouter);
router.use('/usersetlists', usersetlistsRouter);

module.exports = router;
