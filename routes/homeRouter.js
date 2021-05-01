const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const jwt = require('jsonwebtoken');
const auth = require('../auth.js');
const config = require('../config.js');

const accessTokenSecret = config.accessTokenSecret;
const refreshTokenSecret = config.refreshTokenSecret;

const homeRouter = express.Router();

homeRouter.use(bodyParser.json());

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

homeRouter.route('/')
    .get((req, res) => {
        const { role } = req.user;

        // if (role !== 'admin') {
        //     return res.sendStatus(403);
        // }
        var id = req.query.user;
        console.log('name:  ' + id);

        res.send(data);
    });


module.exports = homeRouter;