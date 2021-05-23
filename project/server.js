// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/game', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/main', function (request, response) {
    response.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/profile', function (request, response) {
    response.sendFile(path.join(__dirname, 'profile.html'));
})

app.get('/chat', function (request, response) {
    response.sendFile(path.join(__dirname, 'chat.html'));
})

server.listen(5000, function () {
    console.log('Starting server on port 5000');
});

var players = {};
io.on('connection', function (socket) {
    socket.on('new player', function () {
        players[socket.id] = {
            x: 50,
            y: 384,
            active: true,
            money: 1000
        };
    });
    socket.on('movement', function (data) {
        var player = players[socket.id] || {};
        if (data.left) {
            player.x -= 3;
            if (player.x <= 0) player.x = 0;
        }
        if (data.up) {
            player.y -= 3;
            if (player.y <= 0) player.y = 0;
        }
        if (data.right) {
            player.x += 3;
            if (player.x >= 1342) player.x = 1342;
        }
        if (data.down) {
            player.y += 3;
            if (player.y >= 726) player.y = 726;
        }

    });
    socket.on('disconnect', function () {
        players[socket.id].active = false;
    });
});

setInterval(function () {
    io.sockets.emit('state', players);
}, 1000 / 60);
