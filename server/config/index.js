const BASE_CONFIG = require('./base');
const LOCAL_CONFIG = require('./local');
const TEST_CONFIG = require('./testing');
const PRODUCTION_CONFIG = require('./production');
const LAN_TESTING_CONFIG = require('./lantesting');

console.log('Loading ', process.env.NODE_ENV, 'config.');

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        ...BASE_CONFIG,
        ...PRODUCTION_CONFIG
    }
} else if (process.env.NODE_ENV === 'testing') {
    module.exports = {
        ...BASE_CONFIG,
        ...TEST_CONFIG
    }
}else if(process.env.NODE_ENV == 'lantesting'){
    module.exports = {
        ...BASE_CONFIG,
        ...LAN_TESTING_CONFIG
    }
} else {
    module.exports = {
        ...BASE_CONFIG,
        ...LOCAL_CONFIG
    }
}