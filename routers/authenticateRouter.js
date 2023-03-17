const express = require('express');
// const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

const authenticateRouter = express.Router();
authenticateRouter.route("/").post((req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const User = {email:email, password:password}
    try{
        const accessToken = jwt.sign(User, process.env.ACCESS_TOKEN_SECRET)
        res.send({accessToken:accessToken})
    }catch{
        res.sendStatus(400)
    }
})


module.exports = authenticateRouter