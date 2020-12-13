module.exports = {
    CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
    API_DOMAIN: process.env.API_DOMAIN,
    key: require('./key'),
    category: require('./category').category,
    score: require('./score').score
}