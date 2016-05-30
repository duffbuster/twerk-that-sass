const del     = require('del');
const Promise = require('bluebird');

function cleanBuilt (path) {
    return new Promise(function callback (resolve, reject) {
        del(path, function callback () {
            resolve();
        });
    });
}

module.exports = cleanBuilt;
