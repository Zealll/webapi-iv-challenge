const express = require('express')

const router = express.Router()

// importing our data as 'users'
const users = require('./userDb.js')


// Custom MiddleWare
const { capitalLetters } = require('../../middleware/middleware.js')



// Endpoints For Users Start Here:

// getting all the user data...
router.get('/', (req, res) => {
    users
    .get()
    .then(resources => {
        res.json(resources)
    })
    .catch(() => {
        res
        .status(500)
        .json({message: "The Users information could not be retreived."})
    })
})

// getting an individual user by it's ID...
router.get('/:id', (req, res) => {
    const id = req.params.id

    users
    .getById(id)
    .then(resource => {
        // if the ID doesn't exist, it will return a specific error that is different from a server error.
        if(resource.length < 0) {
            res
            .status(404)
            .json({message: `The post with the specified ID of ${id} does not exist.`})
        } else {
            res.json(resource)
        }
    })
    .catch(error => {
        console.log(error)
        res
        .status(500)
        .json({message: "The User information could not be retrieved."})
    })
})

// getting Posts that correspond with the selected User's ID...
router.get('/:id/posts', (req, res) => {
    const id = req.params.id

    users
    .getUserPosts(id)
    .then(userPosts => {
        if(userPosts.length === 0) {
            res
            .status(404)
            .json({message: `The post with the specified ID of ${id} does not exist.`})
        } else {
            res.json(userPosts)
        }
    })
    .catch(error => {
        console.log(error)
        res
        .status(500)
        .json({message: "Posts regarding this User could not be retrieved."})
    })
})

// endpoint for adding a new user...
// "capitalLetters" checks whether the entered name is capital or not
router.post('/', capitalLetters, (req, res) => {
    const user = req.body

    users
    .insert(user)
    .then(resource => {
        res
        .status(201)
        .json(resource)
    })
    .catch(error =>{
        console.log(error)
        res
        .status(500)
        .json({message: "There was an error while saving new User to the database"})
    })
})

// endpoint for updating an User
router.put('/:id', capitalLetters, (req, res) => {
    const id = req.params.id
    const update = req.body

    users
    .update(id, update)
    .then(updated => {
        if(!updated){
            res
            .status(404)
            .json({message: `The User with the specified ID of ${id} does not exist.`})
        } else {
            res
            .status(200)
            .json({message: `Success! You updated ${updated} item(s)`})
        }
    })
    .catch(error => {
        console.log(error)
        res
        .status(500)
        .json({message: "The User information could not be modified."})
    })
})

// endpoint for deleting...
router.delete('/:id', (req, res) => {
    const id = req.params.id

    users
    .remove(id)
    .then(deleted => {
        if(!deleted) {
            res
            .status(404)
            .json({message: `The User with the specified ID of ${id} does not exist.`})
        } else {
            res.json({message: 'User Has Been Deleted.'}).end()
        }
    })
    .catch(error => {
        console.log(error)
        res
        .status(500)
        .json({error: "User could not be removed"})
    })
})





module.exports = router;