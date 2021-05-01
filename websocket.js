const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const ws = new WebSocket('ws://http://192.168.0.101:3000/');

ws.on('open', function open() {
    const qr_id = uuidv4();

    console.log('id generated: ' + qr_id);
    ws.send(qrif);
});

module.exports = ws;