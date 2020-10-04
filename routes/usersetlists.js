const express = require('express');
const handler = require('express-async-handler');
const { Setlist, User } = require('../db/models');

const router = express.Router();

router.post(
    '/',
    // handleValidationErrors,
    handler(async (req, res) => {
        const { userId, setlistId } = req.body;
        const userSetlist = await Setlist.create({
            userId,
            setListId: setlistId,
            comments: "none",
            isStarred: false
        });
        res.status(201).json(userSetlist);
    }));

router.get(
    '/',
    // handleValidationErrors,
    handler(async (req, res) => {
        const { userId } = req.body;
        const userSetlist = await Setlist.findAll({
            where: { userId }
        });
        res.status(201).json(userSetlist);
    }));

module.exports = router;