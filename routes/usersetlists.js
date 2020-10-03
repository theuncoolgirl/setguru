const express = require('express');
const handler = require('express-async-handler');
const { Setlist, User } = require('../db/models');

const router = express.Router();

router.post(
    '/',
    // handleValidationErrors,
    handler(async (req, res) => {
        const { userId, setListId } = req.body;
        const userSetlist = await Setlist.create({
            userId,
            setListId,
            comments: "none",
            isStarred: false
        });
        res.status(201).json(userSetlist);
    }));

module.exports = router;