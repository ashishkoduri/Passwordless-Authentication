const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const jwt = require('jsonwebtoken');
const auth = require('../auth.js');
const config = require('../config.js');
//const db = require('./database.js');

const accessTokenSecret = config.accessTokenSecret;
const refreshTokenSecret = config.refreshTokenSecret;

const logoutRouter = express.Router();

logoutRouter.use(bodyParser.json());


logoutRouter.route('/')
    .post(async (req, res) => {
        const data = req.body;
        console.log("name...");
        console.log(data);
        console.log('before');
        var temp = data.username.toString();
        console.log(temp);
        console.log(refreshTokens[temp]);
        delete refreshTokens[temp];
        console.log('after');
        console.log(refreshTokens[temp]);

        let date_ob = new Date();

        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();

        var loginDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

        await db.collection('userInfo').doc(temp).set({
            'name': temp,
            'Status': 'inactive',
            'Login Time': '-',
            'Logout Time': loginDate
        }).then(function (docRef) {
            console.log('Doc added: ');
        })
            .catch(function (error) {
                console.error('Error adding document: ' + error);
            });
        res.send("Logout successful");
    });

logoutRouter.route('/check')
    .post(async (req, res) => {
        const data = req.body;


        console.log('name and refreshTokens check:  ');
        var temp = data.username.toString();
        console.log(temp);
        console.log(refreshTokens[temp]);

        if (refreshTokens[temp]) {
            //res.send({ msg: "Logged in" });
            res.send({ msg: "Logged in" });
            console.log('inside 1');
        }

        else {
            res.send({ msg: "Logged out" });
            console.log('inside 2');

        }
    });



module.exports = logoutRouter;