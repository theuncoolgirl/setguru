const express = require('express');
const router = express.Router();

const sessionRouter = require('./session');

router.use('/session', sessionRouter);

module.exports = router;
