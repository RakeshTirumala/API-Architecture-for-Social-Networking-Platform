require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json());
const mongoose = require('mongoose')
const cors = require('cors')
const authenticateRouter = require('./routers/authenticateRouter')
const userRouter = require('./routers/usersRouter');
const followRouter = require('./routers/followRouter');
const unfollowRouter = require('./routers/unfollowRouter');
const uRouter = require('./routers/userRouter');
const postsRouter = require('./routers/postsRouter');

mongoose.connect('mongodb+srv://RakeshTirumala:Rakeshhtirumala_20@cluster0.zvjbzr7.mongodb.net/?retryWrites=true&w=majority')
app.use(cors());

app.get('/', (req, res) => {
  res.send('Express server ready!')
})

app.use('/api/authenticate', authenticateRouter)

app.use('/api/users', userRouter)

app.use('/api/follow', followRouter)

app.use('/api/unfollow', unfollowRouter)

app.use('/api/user', uRouter)

app.use('/api', postsRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})

