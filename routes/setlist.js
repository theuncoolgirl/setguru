const express = require('express');
const handler = require('express-async-handler');
const setlistfm = require('setlistfm-js');
const { setlistfmKey } = require('../config/index')

const router = express.Router();

const setlistfmClient = new setlistfm({
    key: setlistfmKey,
    format: "json",
    language: "en",
});

const setlistDetails = (setlistId) => {
    return setlistfmClient.searchSetlists(setlistId)
        .then(function (setlist) {
            return setlist;
        })
        .catch(function (error) {
            return error;
        });
}

router.put('/', handler(async (req, res) => {
    const { setlistId } = req.body;
    if (setlistId) {
        const results = await setlistDetails(setlistId)
        return res.status(201).json({
            results,
        });
    } else {
        return res.status(404).end();
    }
}));

module.exports = router;