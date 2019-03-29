const express = require('express');
const server = express()
const userRouter = require('./data/helpers/user-router.js')
const postRouter = require('./data/helpers/post-router.js')

server.use(express.json())


server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)


server.get('/', (req, res) => {
    res.send(`
    <h1>Welcome to Elan's Project!</h>
    `)
})

module.exports = server