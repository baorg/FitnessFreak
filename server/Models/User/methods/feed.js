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


    newFeedSet = new Set((topQuestions.concat(followingQuestions)).map(ques => (ques._id)));
    let new_feed = Array.from(newFeedSet).map(ques => ({ _id: ques }));

    new_feed = new_feed.concat(old_feed ? old_feed : []).slice(0, 200);

    this.feed_last_updated = new Date(Date.now() - 1000 * 60);
    this.feed = new_feed;

    await this.save();
}

async function getFeed(skip, count) {
    const { User, Ques } = require('./../../');
    let { feed_last_updated, feed } = await User.findOne({ _id: "5fc0ebb6ba93e2a8d0e892cf" }).select('feed_last_updated feed').populate({
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
            select: "title vote_count"
        }
    }).exec();

    return { last_updated: feed_last_updated, feed };
}

module.exports = {
    refreshFeed,
    getFeed
}