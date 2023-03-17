const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const postModel = require('../models/postModel')

const postsRouter = express.Router()

postsRouter.post('/posts',authenticatingToken,expressAsyncHandler(async(req,res)=>{
    const title = req.body.title
    const description = req.body.description
    const createdTime = new Date().toISOString()
    const newPost = new postModel({"title":title, "description":description, "CreatedTime":createdTime})
    const savedDocument = await newPost.save()
    res.send({
            "postId":savedDocument._id, 
            "title":savedDocument.title, 
            "description":savedDocument.description,
            "createdTime":savedDocument.CreatedTime
        })
}))

postsRouter.delete("/posts/:id",authenticatingToken,expressAsyncHandler(async(req,res)=>{
    const id = req.params.id

    await postModel.findByIdAndDelete(id)
    .then(updated=>{
        res.send(updated)
    })
    .catch(err=>{
        console.error(err);
        res.status(500).send('Error updating user followers ${err}')
    })
}))

postsRouter.post("/like/:id", authenticatingToken, expressAsyncHandler(async(req,res)=>{
    const id = req.params.id
    const userEmail = req.User.email

    await postModel.updateOne({_id:id}, {$set:{likes:userEmail}})
    .then(updated=>{
        res.send(updated)
    })
    .catch(err=>{
        console.error(err);
        res.status(500).send('Error updating post likes')
    })
}))

postsRouter.post("/unlike/:id", authenticatingToken, expressAsyncHandler(async(req,res)=>{
    const id = req.params.id
    const userEmail = req.User.email

    await postModel.updateOne({_id:id}, {$pull:{likes:userEmail}})
    .then(updated=>{
        res.send(updated)
    })
    .catch(err=>{
        console.error(err);
        res.status(500).send('Error updating post likes')
    })
}))

postsRouter.post("/comment/:id", authenticatingToken, expressAsyncHandler(async(req,res)=>{
    const id = req.params.id
    const comment = req.body.comment

    await postModel.updateOne({_id:id}, {$set:{comments:comment}})
    .then(updated=>{
        res.send({comment:id})
        // Here I had a little confusion i.e whether I was 
        //supposed to return a comment's ID or a map of {comment:id to which a comment is added}
    })
    .catch(err=>{
        console.error(err);
        res.status(500).send('Error updating post likes')
    })
}))

postsRouter.get("/posts/:id", authenticatingToken, expressAsyncHandler(async(req,res)=>{
    const post = await postModel.findById(req.params.id)
    if(post) res.send({"title": post.title, "description":post.description, "likes":post.likes.length, "comments":post.comments.length})
    else res.status(404).send({message:'post not found'})
}))

postsRouter.get("/all_posts", authenticatingToken, expressAsyncHandler(async(req,res)=>{
    const posts = await postModel.find({})
    const result = Array()
    posts.map((post)=>{
        const modPost = {"id":post._id, "title":post.title, "desc":post.description, 
        "created_at":post.CreatedTime, "comments":post.comments,"likes":post.likes.length}
        result.push(modPost)
    })
    res.send(result)
}))

function authenticatingToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token==null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, User)=>{
        if(err) return res.sendStatus(403)
        req.User = User
        next()
    })
}

module.exports = postsRouter