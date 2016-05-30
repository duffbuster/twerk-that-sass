var nodemon = require('nodemon');

function nodemonTask (serverScript, watch) {
    return nodemon({
        script   : serverScript,
        nodeArgs : ['--debug'],
        ext      : 'js, html',
        watch    : watch
    });
}

module.exports = nodemonTask;
