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
    '/:userId',
    // handleValidationErrors,
    handler(async (req, res) => {
        const userId = req.params.userId;
        const userSetlist = await Setlist.findAll({
            where: { userId }
        });
        res.status(201).json({ userSetlist });
    }));

router.delete(
    '/:userId/:setlistId',
    handler(async (req, res) => {
        const userId = req.params.userId;
        const setListId = req.params.setlistId;
        Setlist.destroy({
            where: {
                userId,
                setListId
            }
        });
        res.status(201)
    })
);

router.put(
    '/comments/:setlistId',
    handler(async (req, res) => {
        const setListId = req.params.setlistId;
        const comments = await Setlist.findAll({
            attributes: 'comments',
            where: { setListId }
        });
        res.status(201).json({ comments })
    })
)

module.exports = router;

// `/api/usersetlists/${userId}`