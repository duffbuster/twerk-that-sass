const PROD  = 'production';
const STAGE = 'stage';
const DEV   = 'development';

module.exports = {
    TITLE  : 'Energystar Star Raters',
    PORT   : process.env.PORT || 3000,
    HOST   : process.env.HOST || '0.0.0.0',
    ENV    : {
        PROD  : PROD,
        STAGE : STAGE,
        DEV   : DEV
    }
};
