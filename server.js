var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var redis = require('redis-connection');

try {
    var models = require('./server/models/index');
}
catch (error) {
    var message = "Did you initialize your db? Make sure to run initdb.sh in project root.";
    errorAlert("FATAL ERROR", message, error);
    process.exit(1);
}

// Ports
var portApi = process.env.PORT_API || 5000;
var portSocket = process.env.PORT || 8080;

var app = express();
var server = http.createServer(app);
var router = express.Router();
var io = socketio.listen(server);
var redisClient = redis();

// Initialization
initApi();
initSocket();

// Initialize the API listener and router.
function initApi() {
    app.use('/api', router);
    app.listen(portApi);
    // POST
    router.post('/add_comment', function(req, res) {
        models.Comment.create({
              userId: req.body.userId,
              contentId: req.body.contentId,
              timeStamp: req.body.timeStamp,
              content: req.body.content
        }).then(function(comment) {
            res.json(comment);
        });
    });
    router.post('/delete_comment', function(req, res) {
        // To do.
    });
    router.post('/get_comments', function(req, res) {
        // To do.
    });
    console.log('Listening on HTTP Port: ' + portApi);
}

// Initialize the socket listener.
function initSocket() {
    server.listen(portSocket);
    io.on('connection', function(connection) {
        console.log("Client connected successfully.");
        connection.on('timestamp', function(data) {
            redisClient.publish('timestamp', data);
            console.log("Published: " + data);
        });
    });
    console.log('Listening on Socket Port: ' + portSocket);
}

// Print an error alert given it's type, user message, and error message.
function errorAlert(type, message, error) {
    console.log("\n")
    console.log(type);
    console.log("*****");
    console.log(message);
    console.log(error);
    console.log("*****");
    console.log("\n")
}
