const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllMonths = `SELECT * FROM months`
const getSingleMonth = `SELECT monthID, monthName FROM months
    WHERE monthID = (?)`
//we don't need to insert months since all the months are already there

router.get('/', (req, res) => {
    //get all months request
    mysql.pool.query(getAllMonths, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

router.get('/:id', (req, res) => {
    mysql.pool.query(getSingleMonth, ([req.params.id]), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

module.exports = router