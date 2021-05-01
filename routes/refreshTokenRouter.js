const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const jwt = require('jsonwebtoken');
const auth = require('../auth.js');
const config = require('../config.js');

const accessTokenSecret = config.accessTokenSecret;
const refreshTokenSecret = config.refreshTokenSecret;

const refreshRouter = express.Router();

refreshRouter.use(bodyParser.json());


refreshRouter.route('/')
    .post((req, res) => {
        const { token } = req.body;

        if (!token) {
            return res.sendStatus(401);
        }

        if (!refreshTokens.includes(token)) {
            return res.sendStatus(403);
        }

        jwt.verify(token, refreshTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

            res.json({
                accessToken
            });
        });
    });


module.exports = refreshRouter;

/**
 *
 * {
  "qr_id":"19af3e9b-9284-43a6-af40-ad9d74c69e92",
  "username":"Mahidhar Varma"}
 */