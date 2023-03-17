const express = require('express')
const userModel = require('../models/userModel')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const uRouter = express.Router()

uRouter.get('/:id', authenticatingToken,expressAsyncHandler(async(req,res)=>{
    const user = await userModel.findById(req.params.id)
    if(user) res.send({"username":user.email, 
    "followers":user.followers.length, 
    "following":user.following.length})
    else res.status(404).send({message:'user not found'})
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


module.exports = uRouter;