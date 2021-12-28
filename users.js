const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllUsers = `SELECT * FROM users`
const insertUser = `INSERT INTO users
    (username, favoritePlants)
    VALUES (?, ?)`
const getSingleUser = `SELECT * FROM users
    WHERE userID = (?)`
const updateUser = `UPDATE users SET username=?, favoritePlants=?
    WHERE userID = ?`
const deleteUser = `DELETE FROM users WHERE userID = (?)`

//get all users request
router.get('/', (req, res) => {
    mysql.pool.query(getAllUsers, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

//add user request
router.post('/', (req, res) => {
    let content = req.body
    mysql.pool.query(insertUser, ([content.username, content.favoritePlants]), (err, result) => {
        if(err){
            console.log(err);
            //Send sql error to client for debugging
            res.status(500).send(err.sqlMessage);
        } else {
            //If it was successfull, all the client needs to know is that it worked
            res.send(true)
        }
    })
})

// single user
router.get('/:id', (req, res) => {
    mysql.pool.query(getSingleUser, ([req.params.id]), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

// update
router.put('/:id', (req, res) => {
    let content = req.body
    mysql.pool.query(updateUser, ([content.username, content.favoritePlants, req.params.id]), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

// delete
router.delete('/:id', (req, res) => {
    mysql.pool.query(deleteUser, ([req.params.id]), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

module.exports = router