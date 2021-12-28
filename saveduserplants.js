const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

const callbacks = require('./callbacks')

const attributes = ['userID', 'plantID', 'dayHarvested', 'plantGrowthLevels', 'flavorRate', 'locationHarvested']

//queries
const getAllUserPlants = `
SELECT u.username, p.plantName, s.userID, s.plantID, s.dayHarvested, s.plantGrowthLevels, s.flavorRate, s.locationHarvested
FROM savedUserPlants s
INNER JOIN users u
    ON s.userID = u.userID
INNER JOIN plants p
    ON s.plantID = p.plantID
`
const insertUserPlants = `INSERT INTO savedUserPlants
    (userID, plantID, dayHarvested, plantGrowthLevels, flavorRate, locationHarvested)
    VALUES (?, ?, ?, ?, ?, ?)`
const getSingleUserPlants = `SELECT * FROM savedUserPlants
    WHERE userID =? AND plantID=?`
const updateUserPlants = `UPDATE savedUserPlants SET userID=?, plantID=?, dayHarvested=?, plantGrowthLevels=?, flavorRate=?, locationHarvested=?
    where userID =? AND plantID=?`
const deleteUserPlants = `DELETE FROM savedUserPlants WHERE userID =? AND plantID=?`

// get all
router.get('/', (req, res) => {
    callbacks.getAll(req, res, getAllUserPlants)
})

// add
router.post('/', (req, res) => {
    callbacks.addPost(req, res, insertUserPlants, attributes)
})

// get single
router.get('/:userID/:plantID', (req, res) => {
    callbacks.getSingleComposite(req, res, getSingleUserPlants, req.params.userID, req.params.plantID)
})

// update
router.put('/:userID/:plantID', (req, res) => {
    callbacks.updateComposite(req, res, updateUserPlants, attributes, req.params.userID, req.params.plantID)
})

router.delete('/:userID/:plantID', (req, res) => {
    callbacks.deleteComposite(req, res, deleteUserPlants, req.params.userID, req.params.plantID)
})

module.exports = router