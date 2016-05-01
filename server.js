var http = require('http');
var express = require('express');
var socketio = require('socket.io');

var portApi = process.env.PORT_API || 5000;
var portSocket = process.env.PORT || 8080;

var app = express();
var server = http.createServer(app);
var router = express.Router();
var io = socketio.listen(server);

// Routes
router.get('/', function(req, res) {
    res.json({ message: "Default response." });
});
router.get('/comment', function(req, res) {
    res.json({ message: "Added new comment." });
});

app.use('/api', router);
app.listen(portApi);
console.log('Listening on HTTP Port: ' + portApi);

// Socket.IO
server.listen(portSocket);
console.log('Listening on Socket Port: ' + portSocket);
io.on('connection', function(connection) {
    console.log("Client connected successfully.");
});
io.on('timestamp', function(data) {
    console.log("Timestamp: " + data);
});
