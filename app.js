var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    io = require('socket.io'),
    Game = require('./game.js'),
    app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(express.static(path.join(__dirname, 'shared')));

// app.configure('development', function () {
//     app.use(express.errorHandler());
// });

app.get('/', routes.index);

var server = http.createServer(app);

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

var sockets = io.listen(server);
// sockets.set('log level', 0);

var game = new Game(sockets);
game.start();