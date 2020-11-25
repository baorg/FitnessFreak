const { Ques } = require("../../../Models");
const { Ans } = require("../../../Models");

module.exports = function(req, res) {
    const userId = req.user.id;
    const quesId = req.body.quesId;
    const up = req.body.up;
    const down = req.body.down;
    const isQues = req.body.isQues;

    let query;
    if (isQues)
        query = Ques.findById(quesId, 'upDown');
    else
        query = Ans.findById(quesId, 'upDown');
    const promise = query.exec();
    promise.then((ques) => {
            let arr = ques.upDown;
            let index = arr.findIndex((element) => element.userId === userId);
            let result = { upvote: false, downvote: false };
            if (index != -1) {

                if (arr[index].value == 1) {
                    if (down !== undefined) {
                        arr.set(index, { userId, value: -1 });
                        // arr[index].value = -1;
                    } else
                        arr.splice(index, 1);
                } else {
                    // if(arr[index].value == -1)
                    if (up !== undefined)
                        arr.set(index, { userId, value: 1 });
                    // arr[index].value = 1;
                    else
                        arr.splice(index, 1);

                }

            } else {
                let value = (up === undefined) ? -1 : 1;
                arr.push({ userId: userId, value: value })

            }
            ques.save((err) => {
                if (err) return res.send("Error in recording response");
                return res.send("Your respnose has been submitted succesully");
            })


        })
        .catch((err) => {
            return res.send({ err: err });
        })


}