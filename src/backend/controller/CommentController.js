const commentmodel = require('../models/commentsmodel')


const submitcomment = async(req,res) => {
console.log(req.query.blogid)
    let data = {
        ...req.body,
        blogid:req.query.blogid
    }

    console.log(data)

    await commentmodel.create(data)

    res.redirect(`/viewblog?blogid=${req.query.blogid}&page=1`)
}


module.exports= {
    submitcomment
}