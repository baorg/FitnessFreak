const { User, Ques } = require('../../Models');


module.exports = async function(req, res, next) {
    let questions = [];
    console.log('is authenticated', req.isAuthenticated(), 'User', req.user);
    if (req.isAuthenticated()) {
        let current_timestamp = new Date(Date.now());
        let user = req.user;
        let feed = await req.user.getFeed();
        if (current_timestamp - feed.last_updated >= 6 * 60 * 60 * 1000) {
            await user.refreshFeed();
            feed = await req.user.getFeed();
        }
        questions = feed.questions_list;
    } else {
        questions = await Ques.getTopQuestions(new Date(0), new Date(Date.now()), 50, select = 'id title');
    }
    // console.log("questions: ", questions)
    res.data = { questions: questions };
    return next();
}