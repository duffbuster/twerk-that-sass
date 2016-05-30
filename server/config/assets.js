const envStrings = require('./site');

const assets = {
    BUILD_PATH  : 'built/',
    client      : {
        src  : {
            scss : [
                'public/scss/**/*.scss'
            ]
        },
        destination : {
            css  : 'built/css'
        }
    },
    server      : {
        src : [
            'server/**/*.js',
            'gulpfile.js',
            'index.js'
        ],
        views : [
            'server/views/**/*.pug'
        ]
    },
    built : []
};

assets.built[envStrings.ENV.DEV] = {
    css : 'built/css/*.css'
};

assets.built[envStrings.ENV.PROD] = {
    css : 'built/css/*.min.css'
};

module.exports = assets;
