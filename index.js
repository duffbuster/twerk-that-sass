const express = require('express');
const winston = require('winston');
const config  = require('./server/config');

//local variable declaration
var shutting_down = false;
var server = null;
// var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.locals.pretty = true;
app.set('views', __dirname + '/server/views');
app.set('view engine', 'pug');

app.use('/public', express.static(__dirname + '/public'));
app.use('/built', express.static(__dirname + '/built'));

app.disable('x-powered-by');

app.use(function use (req, resp, next) {
    if (!shutting_down) {
        return next();
    }

    resp.setHeader('Connection', 'close');
    resp.send(503, 'Server is in the process of restarting');
});

app.set('port', config.site.PORT);
app.set('host', config.site.HOST);

app.get('*', function get (req, res) {
    res.render('index', {
        title    : config.site.TITLE,
        cssFiles : config.built.css
    });
});

server = app.listen(app.get('port'), app.get('host'), function listen () {
    winston.info('Express server listening on port ' + app.get('port'));
});

function cleanup () {
    shutting_down = true;
    server.close(function close () {
        winston.info('Closed out remaining connections.');
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
