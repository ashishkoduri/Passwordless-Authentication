const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const jwt = require('jsonwebtoken');
const auth = require('../auth.js');
const config = require('../config.js');

const accessTokenSecret = config.accessTokenSecret;
const refreshTokenSecret = config.refreshTokenSecret;

const userRouter = express.Router();

userRouter.use(bodyParser.json());

authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

userRouter.route('/')
    .get(authenticateJWT, (req, res) => {
        const { role } = req.user;

        // if (role !== 'admin') {
        //     return res.sendStatus(403);
        // }
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        var data = jwt.decode(token);

        res.send(data);
    });


module.exports = userRouter;