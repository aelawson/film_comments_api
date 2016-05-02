var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var redis = require('redis-connection');
var Sequelize = require('sequelize');

// Db Settings
DB_HOST = "localhost";
DB_DATABASE = "database";
DB_USERNAME "root";
DB_PASSWORD = "";
DB_DIALECT = "postgres";

// Ports
var portApi = process.env.PORT_API || 5000;
var portSocket = process.env.PORT || 8080;

var app = express();
var server = http.createServer(app);
var router = express.Router();
var io = socketio.listen(server);
var redisClient = redis();

// Initialization
initSequelize();
initApi();
initSocket();

// Initialize sequelize.
function initSequelize() {
    var sequelize = new sequelize(
        DB_DATABASE,
        DB_USERNAME,
        DB_PASSWORD, {
        host: DB_HOST,
        dialect: DB_DIALECT
    });
    sequelize.sync().then(function() {
        return User.create({
            username: 'janedoe',
            birthday: new Date(1980, 6, 20)
        });
    }).then(function(jane) {
        console.log(jane.get({
            plain: true
        }));
    });
}

// Initialize the API listener and router.
function initApi() {
    app.use('/api', router);
    app.listen(portApi);
    // GET
    router.get('/', function(req, res) {
        // To do.
    });
    // POST
    router.post('/add_comment', function(req, res) {
        // To do.
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
