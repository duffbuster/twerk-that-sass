const envStrings = require('../server/config').site;

function setProd () {
    process.env.NODE_ENV = envStrings.ENV.PROD;
}

function setStage () {
    process.env.NODE_ENV = envStrings.ENV.STAGE;
}

function setDev () {
    process.env.NODE_ENV = envStrings.ENV.DEV;
}

module.exports = {
    setProd  : setProd,
    setStage : setStage,
    setDev   : setDev
};
