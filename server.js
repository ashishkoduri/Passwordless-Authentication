var debug = require('debug')('pswdlss-server:server');
var http = require('http');
const bp = require("body-parser");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');





// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
//Handling post request
app.post('/login', function (req, res, next) {
    console.log(req.body);
    res.status(201).send('received post request' + JSON.stringify(req.body));
})
/**
 * Create HTTP server.
 */

var server = http.createServer(app);


const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const QRCode = require("qrcode");

var sockets_connections = {};
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {

    //qr_id is the unique string for generating QR Code
    ws.on('message', function incoming(data) {
        // wss.clients.forEach(function each(client) {
        //   if (client.readyState === WebSocket.OPEN) {
        //     client.send(data);
        //   }
        // });

        var client_msg = JSON.parse(data);
        if (client_msg.message == 'Connected to WS Server') {
            const qr_id = uuidv4();

            console.log('socket at server connected with id: ' + qr_id);
            var server_msg = {
                'Auth': false,
                'message': 'QR generation',
                'QR_Id': qr_id
            }

            sockets_connections[qr_id] = ws;
            //sending the qr_id to the web browser to generate a QR Code
            ws.send(JSON.stringify(server_msg));
        }


    });

});



/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */


function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = server;