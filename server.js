var express = require('express');
var winston = require('winston');

//local variable declaration
var shutting_down = false;
var server = null;
// var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

winston.add(winston.transports.Consle);

app.set('views', __dirname + '/server/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.disable('x-powered-by');

app.use(function use (req, resp, next) {
    if (!shutting_down) {
        return next();
    }

    resp.setHeader('Connection', 'close');
    resp.send(503, 'Server is in the process of restarting');
});

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');

app.get('*', function get (req, res) {
    res.render('index', {
        title : 'Twerk That Sass'
    });
});

server = app.listen(app.get('port'), app.get('host'), function listen () {
    winston.log('Express server listening on port ' + app.get('port'));
});

function cleanup () {
    shutting_down = true;
    server.close(function close () {
        winston.log('Closed out remaining connections.');
        // Close db connections, other chores, etc.
        process.exit();
    });

    setTimeout(function shutdown () {
        winston.error('Could not close connections in time, forcing shut down');
        process.exit(1);
    }, 30 * 1000);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
