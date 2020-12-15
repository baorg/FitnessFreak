const CONFIG = require('./config.json');
require('dotenv').config({ path: '../.env' });

console.log('CONFIG: ', process.env.NODE_ENV);

if (process.env.NODE_ENV == 'production')
    module.exports = CONFIG.PRODUCTION;
else if (process.env.NODE_ENV == 'testing')
    module.exports = CONFIG.TESTING
else
    module.exports = CONFIG.LOCAL