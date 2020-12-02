(async function() {
    try {
        const { mongooseSetup } = require('./setup');
        const { User, Ques } = require('./Models');
        let limit = 5;
        let page = 2;
        await mongooseSetup();

        let user = await User.findOne({ _id: "5fc0ebb6ba93e2a8d0e892cf" }).select('feed').populate({
            path: 'feed',
            options: {
                limit: limit,
                skip: (page - 1) * limit,
                select: "title vote_count"
            }
        }).exec();
        console.log('User', user, count);
    } catch (err) {
        console.error('ERROR: ', err);
    } finally {
        console.log('END');
        return 0;
    }
})();