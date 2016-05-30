const glob    = require('glob');
const assets  = require('./assets');
const site    = require('./site');
const winston = require('winston');
const _       = require('lodash');

function getGlobbedPaths (globPatterns, excludes) {
    const urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i'); // URL paths regex
    var output   = []; // The output array
    var files;
    var i;

    // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function eachPattern (globPattern) {
            output = _.union(output, getGlobbedPaths(globPattern, excludes));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            files = glob.sync(globPatterns);
            if (excludes) {
                files = files.map(function fileMap (file) {
                    if (_.isArray(excludes)) {
                        for (i in excludes) {
                            file = file.replace(excludes[i], '');
                        }
                    } else {
                        file = file.replace(excludes, '');
                    }
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }

    return output;
}

function initPublicStyles () {
    winston.info(assets.built[process.env.NODE_ENV || site.ENV.DEV].css);
    return getGlobbedPaths(assets.built[process.env.NODE_ENV || site.ENV.DEV].css, assets.static);
}

module.exports = {
    assets : assets,
    built  : {
        css : initPublicStyles()
    },
    site    : site
};
