const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const unfollowRouter = express.Router()

unfollowRouter.post("/:id",authenticatingToken,expressAsyncHandler(async(req,res)=>{
    const id = req.params.id
    const userEmail = req.User.email

    await userModel.updateOne({_id: id}, {$pull:{followers:userEmail}})
    .then(updated=>{
        res.send(updated)
    })
    .catch(err=>{
        console.error(err);
        res.status(500).send('Error updating user followers ${err}')
    })
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

module.exports = unfollowRouter