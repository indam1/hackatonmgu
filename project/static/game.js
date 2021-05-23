var socket = io();

var movement = {
    up: false,
    down: false,
    left: false,
    right: false
}
document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = true;
            break;
        case 87: // W
            movement.up = true;
            break;
        case 68: // D
            movement.right = true;
            break;
        case 83: // S
            movement.down = true;
            break;
    }
});


document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = false;
            break;
        case 87: // W
            movement.up = false;
            break;
        case 68: // D
            movement.right = false;
            break;
        case 83: // S
            movement.down = false;
            break;
    }
});

socket.emit('new player');
setInterval(function () {
    socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = 1700;
canvas.height = 766;
var context = canvas.getContext('2d');

var imgs = {};
imgs["map"] = document.getElementById('map');
imgs["theory"] = document.getElementById('theory');
imgs["person"] = document.getElementById('person');
imgs["test"] = document.getElementById('test');
imgs["right"] = document.getElementById('right');
imgs["wrong"] = document.getElementById('wrong');
imgs["time"] = document.getElementById('time');
imgs["history"] = document.getElementById('history');
imgs["goodReward"] = document.getElementById('goodReward');
imgs["badReward"] = document.getElementById('badReward');
var boo = 0;
socket.on('state', function (players) {
    context.clearRect(0, 0, 1700, 766);
    context.drawImage(imgs['map'], 0, 0);
    for (var id in players) {
        var player = players[id];
        if (player.active) {
            context.drawImage(imgs['person'], player.x, player.y);
            if (player.x > 0 && player.x < 200 && player.y > 0 && player.y < 284) { // Theory
                context.drawImage(imgs['theory'], 0, 0);
            } else if (player.x > 0 && player.x < 200 && player.y > 484 && player.y < 766) { // Test1
                if (boo == 0)
                    context.drawImage(imgs['test'], 0, 0);
                else if (boo == 1)
                    context.drawImage(imgs['right'], 0, 0);
                else if (boo == 2)
                    context.drawImage(imgs['wrong'], 0, 0);
                canvas.onmousedown = function (e) {
                    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
                    if (loc.x > 1423 && loc.x < 1635 && loc.y > 86 && loc.y < 200)
                        boo = 1;
                    else if (loc.x > 1423 && loc.x < 1635 && loc.y > 227 && loc.y < 341)
                        boo = 2;
                    else if (loc.x > 1423 && loc.x < 1635 && loc.y > 363 && loc.y < 477)
                        boo = 2;
                    else if (loc.x > 1423 && loc.x < 1635 && loc.y > 499 && loc.y < 613)
                        boo = 2;
                };
                canvas.onmouseup = function (e) {
                    boo = 0;
                };
            } else if (player.x > 300 && player.x < 633 && player.y > 0 && player.y < 284) { //History
                context.drawImage(imgs['history'], 0, 0);
            } else if (player.x > 300 && player.x < 633 && player.y > 484 && player.y < 766) { //Test2
                if (boo == 0)
                    context.drawImage(imgs['test'], 0, 0);
                else if (boo == 1)
                    context.drawImage(imgs['right'], 0, 0);
                else if (boo == 2)
                    context.drawImage(imgs['wrong'], 0, 0);
                canvas.onmousedown = function (e) {
                    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
                    if (loc.x > 1423 && loc.x < 1635 && loc.y > 86 && loc.y < 200)
                        boo = 1;
                    else if (loc.x > 1423 && loc.x < 1635 && loc.y > 227 && loc.y < 341)
                        boo = 2;
                    else if (loc.x > 1423 && loc.x < 1635 && loc.y > 363 && loc.y < 477)
                        boo = 2;
                    else if (loc.x > 1423 && loc.x < 1635 && loc.y > 499 && loc.y < 613)
                        boo = 2;
                };
                canvas.onmouseup = function (e) {
                    boo = 0;
                };
            } else if (player.x > 1166 && player.x < 1366 && player.y > 0 && player.y < 284) { //GoodReward
                context.drawImage(imgs['goodReward'], 0, 0);
            } else if (player.x > 1166 && player.x < 1366 && player.y > 484 && player.y < 766) { //BadReward
                context.drawImage(imgs['badReward'], 0, 0);
            }
        }
    }
    context.drawImage(imgs['time'], 0, 0);
});

function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}
