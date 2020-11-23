const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./routes');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// Serve React Application
// This should come after routes, but before 404 and error handling.
if (process.env.NODE_ENV === 'production') {
    // Serve the client's index.html file at the root route
    app.get('/', (req, res) => {
        // res.cookie("XSRF-TOKEN", req.csrfToken());
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });

    // Serve the static assets in the client's build folder
    app.use(express.static("client/build"));

    // Serve the client's index.html file at all other routes NOT starting with /api
    app.get(/\/(?!api)*/, (req, res) => {
        // res.cookie("XSRF-TOKEN", req.csrfToken());
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

module.exports = app;

















