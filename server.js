var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var redis = require('redis-connection');

var portApi = process.env.PORT_API || 5000;
var portSocket = process.env.PORT || 8080;

var app = express();
var server = http.createServer(app);
var router = express.Router();
var io = socketio.listen(server);
var redisClient = redis();

// Routes
router.get('/', function(req, res) {
    res.json({ message: "Default response." });
});

app.use('/api', router);
app.listen(portApi);
console.log('Listening on HTTP Port: ' + portApi);

// Socket.IO
server.listen(portSocket);
console.log('Listening on Socket Port: ' + portSocket);
io.on('connection', function(connection) {
    console.log("Client connected successfully.");
    connection.on('timestamp', function(data) {
        redisClient.publish('timestamp', data);
        console.log("Published: " + data);
    });
});
