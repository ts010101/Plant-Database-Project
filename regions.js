const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllRegions = `SELECT * FROM regions`
const insertRegion = `INSERT INTO regions
    (regionName, state)
    VALUES (?, ?)`
const getSingleRegion = `SELECT * FROM regions
    WHERE regionID = (?)`
const updateRegion = `UPDATE regions SET regionName=?, state=?
    WHERE regionID = ?`
const deleteRegion = `DELETE FROM regions WHERE regionID = (?)`

//get all regions request
router.get('/', (req, res) => {
    mysql.pool.query(getAllRegions, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

//insert region request
router.post('/', (req, res) => {
    let content = req.body
    mysql.pool.query(insertRegion,
        ([content.regionName, content.state]), (err, result) => {
            if(err){
                console.log(err);
            } else {
                res.send(result)
            }
        })
})

// get single region
router.get('/:id', (req, res) => {
    mysql.pool.query(getSingleRegion, ([req.params.id]), (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

// update region
router.put('/:id', (req, res) => {
    let content = req.body
    mysql.pool.query(updateRegion, ([content.regionName, content.state, req.params.id]), (err,result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

// delete
router.delete('/:id', (req, res) => {
    mysql.pool.query(deleteRegion, ([req.params.id]), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

module.exports = router