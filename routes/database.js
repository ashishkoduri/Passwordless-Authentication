const admin = require('firebase-admin');
const serviceAccount = require('./passwordless-authenticat-6dbc6-0d192f014af1.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

exports.module = db;