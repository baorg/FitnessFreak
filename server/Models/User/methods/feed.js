// function getPower(user, question) {
//     upvote = question.vote_count.upvote;
//     isfollowed = user.following.
// }

async function refreshFeed() {
    const { User, Ques } = require('./../../');
    let feed = (await User.findOne({ _id: this._id }).select('feed').exec()).feed;

    const current_time = new Date(Date.now());
    const last_updated = feed ? feed.last_updated : new Date(0);

    let old_feed = feed.questions_list;

    let followingQuestions = await this.getAllQuestionsOfFollowings(last_updated, current_time, 'id vote_count created_at');
    let topQuestions = await Ques.getTopQuestions(last_updated, current_time, 50, 'id vote_count created_at');


    newFeedSet = new Set((topQuestions.concat(followingQuestions)).map(ques => (ques._id)));
    let new_feed = Array.from(newFeedSet).map(ques => ({ _id: ques }));

    new_feed = new_feed.concat(old_feed ? old_feed : []).slice(0, 200);

    this.feed.last_updated = new Date(Date.now() - 1000 * 60);
    this.feed.questions_list = new_feed;

    await this.save();

    console.log(this.feed);
}

async function getFeed() {
    const { User, Ques } = require('./../../');
    let feed = (await User.findOne({ _id: this._id }).select('feed').exec()).feed;
    // console.log("MyFeed:", feed.questions_list);
    return feed;
}

module.exports = {
    refreshFeed,
    getFeed
}