const { User, Ques } = require('../../Models');
const { QuestionSerializers } = require('./../../Serializers');

module.exports = async function(req, res, next) {
    let questions = [];
    let { page = 1 } = req.query;
    let count = 10;

    // console.log('is authenticated', req.isAuthenticated(), 'User', req.user);
    if (req.isAuthenticated()) {
        let current_timestamp = new Date(Date.now());
        let user = req.user;
        let { last_updated, feed } = await req.user.getFeed(
            (page - 1) * count, count,
            'vote_count title question userId tags categoryName created_at', [{
                path: 'userId',
                model: User,
                select: 'username profile_image first_name last_name'
            }]);

        if (current_timestamp - last_updated >= 6 * 60 * 60 * 1000) {
            await user.refreshFeed();
            feed = await req.user.getFeed(
                (page - 1) * count, count,
                'vote_count title question userId tags categoryName created_at', [{
                    path: 'userId',
                    model: User,
                    select: 'username profile_image first_name last_name'
                }]).feed;
        }
        questions = feed;
    } else {
        questions = await Ques.getTopQuestions(new Date(0), new Date(Date.now()),
            (page - 1) * count, count,
            'vote_count title question userId tags categoryName created_at', [{
                path: 'userId',
                model: User,
                select: 'username profile_image first_name last_name'
            }, ]
        );
    }
    questions = questions.map(question => QuestionSerializers.feedQuestionSerializer(question));
    res.data = { questions: questions };

    return next();
}