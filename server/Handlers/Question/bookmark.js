const { Ques, Ans, User, Tag } = require("../../Models");
const score = require("../../config").score;
const saveChanges = require("./utilis").saveChanges;


module.exports.saveBookMark = async function(req, res, next) {
    try {
        const userId = req.user.id
        const quesId = req.body.quesId
            // let obj = {err : true}
        const name = "bookmark"
        let user = await User.findById(userId).exec()
        let arr = user.bookmarks;
        const index = arr.findIndex((ele) => ele._id == quesId)

        console.log("saveIndex = ", index);
        let sign = 1;
        if (index === -1)
            arr.push(quesId)
        else {
            arr.splice(index, 1)
            sign = -1;
        }

        let response = await saveChanges(quesId, userId, sign, name);
        await user.save();

        res.data.success = true;
        res.data.is_saved = true;
        res.data.marked = (sign == 1);
    } catch (err) {
        console.log("ERROR:", err);

        res.data.success = false;
        res.data.error = "Some internal error.";
    } finally {
        return next();
    }

}


module.exports.isBookMarked = function(req, res, next) {

    const userId = req.user.id
    const { quesId } = req.query;
    const obj = { err: true }

    const promise = User.findById(userId).exec();
    promise.then((user) => {
            console.log("user = ", user)
            console.log("quesId = ", quesId)
            obj.err = false
            const arr = user.bookmarks
            const index = arr.findIndex((ele) => {
                console.log("ele = ", ele)
                return ele == quesId
            })
            console.log("isMarked index = ", index)
            if (index === -1)
                obj.marked = false;
            else
                obj.marked = true;

            res.data.success = true;
            res.data = {...res.data, ...obj };
            return next();
        })
        .catch((err) => {
            console.log("ERROR:", err);
            res.data.success = false;
            res.data.error = 'SOme internal error.';
            res.data = {...res.data, ...obj };
        });
}

// module.exports.saveBookMark = function(req, res){

//     const userId = req.user.id
//     const quesId = req.body.quesId
//     const obj = {err : true}

//     const promise = User.findById(userId).exec()
//     promise.then((user) => {
//         const arr = user.bookmarks
//         const index = arr.findIndex((ele) => {
//             return ele === quesId
//         })

//         if(index === -1)
//         arr.push(quesId)
//         else
//         arr.splice(index, 1)

//         user.save((err) => {
//         if(err) 
//         return res.send(obj)
//         return res.send({err : false})
//         })


//     })
//     .catch((err) => {
//         console.log("err = ", err)
//         return res.send(obj)

//     })


// }


// module.exports.isBookMarked = function(req, res){

//     const userId = req.user.id
//     const quesId = req.body.quesId
//     const obj = {err : true}

//     const promise = User.findById(userId).exec()
//     promise.then((user) => {

//         obj.err = false
//         const arr = user.bookmarks
//         const index = arr.findIndex((ele) => ele === quesId)
//         console.log("isMarked index = ", index)
//         if(index === -1)
//             obj.marked = false;
//         else
//             obj.marked = true;
//             return res.send(obj)


//     })
//     .catch((err) => {
//         console.log("err = ", err)
//         return res.send(obj)

//     })


// }