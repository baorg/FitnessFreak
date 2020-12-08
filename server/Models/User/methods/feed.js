// function getPower(user, question) {
//     upvote = question.vote_count.upvote;
//     isfollowed = user.following.
// }

async function refreshFeed() {
    const { User, Ques } = require('./../../');
    let { feed, feed_last_updated } = await User.findOne({ _id: this._id }).select('feed feed_last_updated').exec();

    const current_time = new Date(Date.now());

    let old_feed = feed;

    let followingQuestions = await this.getAllQuestionsOfFollowings(feed_last_updated, current_time, 'id vote_count created_at',
        'title question categoryName userId tags vote_count', [{
            path: 'userId',
            model: User,
            select: 'username'
        }]);
    let topQuestions = await Ques.getTopQuestions(feed_last_updated, current_time, 0, 50,
        'title question categoryName userId tags vote_count', [{
            path: 'userId',
            model: User,
            select: 'username'
        }]);


    let new_feed = followingQuestions.map(q => q._id); // Feed list with new questions.
    let questions_count = new_feed.length; // Count of questions in new feed.

    // To add unique questions only.
    let feedSet = new Set(new_feed);


    // Adding top-questions to our feed list.
    for (var i = 0; i < topQuestions.length; i++) {
        if (!feedSet.has(topQuestions[i]._id)) {
            feedSet.add(topQuestions[i]._id);
            new_feed.push(topQuestions[i]._id);
        }
    }

    questions_count = new_feed.length;

    for (var i = 0; i < old_feed.length && questions_count < 200; i++) {
        new_feed.push(old_feed[i]);
        feedSet.add(old_feed[i]);
        questions_count++;
    }

    this.feed_last_updated = new Date(Date.now() - 1000 * 60);
    this.feed = new_feed;

    await this.save();
}

async function getFeed(skip, count) {
    const { User, Ques } = require('./../../');
    let { feed_last_updated, feed } = await User.findOne({ _id: this._id }).select('feed_last_updated feed').populate({
        path: 'feed',
        model: Ques,
        select: 'title question categoryName userId tags vote_count',
        populate: {
            path: 'userId',
            model: User,
            select: 'username'
        },
        options: {
            limit: count,
            skip: skip,
            select: "title vote_count created_at"
        }
    }).exec();

    return { last_updated: feed_last_updated, feed };
}

module.exports = {
    refreshFeed,
    getFeed
}