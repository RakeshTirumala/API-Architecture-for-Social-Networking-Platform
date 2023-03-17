const express = require('express')
const userModel = require('../models/userModel')
const data = require('../data')
const expressAsyncHandler = require('express-async-handler')

const userRouter = express.Router()

userRouter.get('/', expressAsyncHandler(async(req,res)=>{
    const users = await userModel.find({})
    res.send(users)
}))

userRouter.get('/seed', expressAsyncHandler(async(req,res)=>{
    await userModel.deleteMany({})
    const createdUsers = await userModel.insertMany(data.users)
    res.send({createdUsers})
}))





module.exports = userRouter