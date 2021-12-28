const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

const callbacks = require('./callbacks')

//queries
const getAllEnvirons = `SELECT * FROM environFactors`
const insertEnviron = `INSERT INTO environFactors
    (environName, plantEffect)
    VALUES (?, ?)`
const getSingleEnviron = `SELECT * FROM environFactors
    WHERE environID = (?)`
const updateEnviron = `UPDATE environFactors SET environName=?, plantEffect=?
    WHERE environID = ?`
const deleteEnviron = `DELETE FROM environFactors WHERE environID = (?)`

//get all environs request
router.get('/', (req, res) => {
    callbacks.getAll(req, res, getAllEnvirons)
})

//add environs request
router.post('/', (req, res) => {
    callbacks.addPost(req, res, insertEnviron, ['environName', 'plantEffect'])
})

// get single environs request
router.get('/:id', (req, res) => {
    callbacks.getSingle(req, res, getSingleEnviron, req.params.id)
})

// update
router.put('/:id', (req, res) => {
    callbacks.updatePut(req, res, updateEnviron, ['environName', 'plantEffect'], req.params.id)
})

// delete
router.delete('/:id', (req, res) => {
    callbacks.deleteSingle(req, res, deleteEnviron, req.params.id)

    /*
    mysql.pool.query(deleteEnviron, ([req.params.id]), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
    */
})

module.exports = router