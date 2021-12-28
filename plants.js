const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllPlants = `SELECT * FROM plants`
const insertPlant = `INSERT INTO plants 
    (plantName, harvestSeasonStart, harvestSeasonEnd, flavorProfile, eatenRaw, howToCook) 
    VALUES (?, ?, ?, ?, ?, ?)`
const getSinglePlant = `SELECT * FROM plants
    WHERE plantID = (?)`
const updatePlant = `UPDATE plants SET plantName=?, harvestSeasonStart=?, harvestSeasonEnd=?,
    flavorProfile=?, eatenRaw=?, howToCook=?
    WHERE plantID = ?`
const deletePlant = `DELETE FROM plants WHERE plantID = (?)`

const searchPlants = `SELECT * FROM plants WHERE LOWER(plantName) LIKE CONCAT('%', LOWER((?)), '%')`

//get all plants request
router.get('/', (req, res) => {
    mysql.pool.query(getAllPlants, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

//add plant request
router.post('/', (req, res) => {
    let content = req.body
    mysql.pool.query(insertPlant,
        ([content.plantName, content.harvestSeasonStart, content.harvestSeasonEnd, content.flavorProfile, content.eatenRaw, content.howToCook]),
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            }
        })
})

router.get('/search/:pattern', (req, res) => {
    mysql.pool.query(searchPlants, ([req.params.pattern]), (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

// get single request
router.get('/:id', (req, res) => {
    mysql.pool.query(getSinglePlant, ([req.params.id]), (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

// update
router.put('/:id', (req, res) => {
    let content = req.body
    mysql.pool.query(updatePlant, ([content.plantName, content.harvestSeasonStart, content.harvestSeasonEnd,
    content.flavorProfile, content.eatenRaw, content.howToCook, req.params.id]), (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

// delete
router.delete('/:id', (req, res) => {
    mysql.pool.query(deletePlant, ([req.params.id]), (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

module.exports = router