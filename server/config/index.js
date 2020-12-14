const BASE_CONFIG = require('./base');
const LOCAL_CONFIG = require('./local');
const PRODUCTION_CONFIG = require('./production');

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        ...BASE_CONFIG,
        ...PRODUCTION_CONFIG
    }
} else {
    module.exports = {
        ...BASE_CONFIG,
        ...LOCAL_CONFIG
    }
}