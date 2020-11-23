const { Ques, Ans, User, Tag } = require("../../Models");



// module.exports.saveBookMark = function(req, res){

//     const userId = req.user.id
//     const quesId = req.body.quesId
//     const obj = {err : true}
//     console.log("typeofQuesID = ", typeof quesId )
//     const promise = User.findById(userId).populate("bookmarks").exec()
//     promise.then((user) => {
//         console.log("user = ", user)
//         const arr = user.bookmarks
//         const index = arr.findIndex((ele) => {
//             console.log("ele = ",ele)
//             console.log("typeofele = ", typeof ele._id  )
//         return ele._id === quesId

//         })
//         console.log("saveIndex = ", index)
//         if(index === -1)
//         arr.push(quesId)
//         else
//         arr.splice(index, 1)

//         user.save((err) => {
//         if(err) 
//         return res.send(obj)
//         // obj.err = false;
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
//         console.log("user = ", user)
//         console.log("quesId = ", quesId)
//         obj.err = false
//         const arr = user.bookmarks
//         const index = arr.findIndex((ele) => ele == quesId)
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

module.exports.saveBookMark = function(req, res){

    const userId = req.user.id
    const quesId = req.body.quesId
    const obj = {err : true}

    const promise = User.findById(userId).exec()
    promise.then((user) => {
        const arr = user.bookmarks
        const index = arr.findIndex((ele) => {
            return ele === quesId
        })
      
        if(index === -1)
        arr.push(quesId)
        else
        arr.splice(index, 1)

        user.save((err) => {
        if(err) 
        return res.send(obj)
        return res.send({err : false})
        })
        

    })
    .catch((err) => {
        console.log("err = ", err)
        return res.send(obj)
        
    })


}


module.exports.isBookMarked = function(req, res){

    const userId = req.user.id
    const quesId = req.body.quesId
    const obj = {err : true}

    const promise = User.findById(userId).exec()
    promise.then((user) => {
    
        obj.err = false
        const arr = user.bookmarks
        const index = arr.findIndex((ele) => ele === quesId)
        console.log("isMarked index = ", index)
        if(index === -1)
            obj.marked = false;
        else
            obj.marked = true;
            return res.send(obj)
       

    })
    .catch((err) => {
        console.log("err = ", err)
        return res.send(obj)
        
    })


}