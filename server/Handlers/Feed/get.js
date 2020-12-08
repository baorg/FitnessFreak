const { User, Ques } = require('../../Models');
const { QuestionSerializers } = require('./../../Serializers');

// app.get('/posts', async (req, res) => {
//     // destructure page and limit and set default values
//     const { page = 1, limit = 10 } = req.query;

//     try {
//       // execute query with page and limit values
//       const posts = await Posts.find()
//         .limit(limit * 1)
//         .skip((page - 1) * limit)
//         .exec();

//       // get total documents in the Posts collection 
//       const count = await Posts.countDocuments();

//       // return response with posts, total pages, and current page
//       res.json({
//         posts,
//         totalPages: Math.ceil(count / limit),
//         currentPage: page
//       });
//     } catch (err) {


module.exports = async function(req, res, next) {
    let questions = [];
    let { page = 1 } = req.query;
    let count = 10;

    console.log('is authenticated', req.isAuthenticated(), 'User', req.user);
    if (req.isAuthenticated()) {
        let current_timestamp = new Date(Date.now());
        let user = req.user;
        let { last_updated, feed } = await req.user.getFeed(
            (page - 1) * count, count,
            'vote_count title question userId tags categoryName created_at', [{
                path: 'userId',
                model: User,
                select: 'username'
            }]);

        if (current_timestamp - last_updated >= 6 * 60 * 60 * 1000) {
            await user.refreshFeed();
            feed = await req.user.getFeed(
                (page - 1) * count, count,
                'vote_count title question userId tags categoryName created_at', [{
                    path: 'userId',
                    model: User,
                    select: 'username'
                }]).feed;
        }
        questions = feed;
    } else {
        questions = await Ques.getTopQuestions(new Date(0), new Date(Date.now()),
            (page - 1) * count, count,
            'vote_count title question userId tags categoryName created_at', [{
                path: 'userId',
                model: User,
                select: 'username'
            }, ]
        );
    }
    questions = questions.map(question => QuestionSerializers.feedQuestionSerializer(question));
    res.data = { questions: questions };
    return next();
}