const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

const callbacks = require('./callbacks')

const attributes = ['plantID', 'monthID', 'harvestReady']

//queries
const getAllPlantMonthly = `
SELECT pm.monthID, pm.plantID, p.plantName, m.monthName, pm.harvestReady
FROM plantMonthlyState pm
INNER JOIN months m
    ON pm.monthID = m.monthID
INNER JOIN plants p
    ON pm.plantID = p.plantID
`
const insertPlantMonthly = `INSERT INTO plantMonthlyState
    (plantID, monthID, harvestReady)
    VALUES (?, ?, ?)`
const getSinglePlantMonthly = `SELECT * FROM plantMonthlyState
    WHERE plantID =? AND monthID=?`
const updatePlantMonthly = `UPDATE plantMonthlyState SET plantID=?, monthID=?, harvestReady=?
    where plantID =? AND monthID=?`
const deletePlantMonthly = `DELETE FROM plantMonthlyState WHERE plantID =? AND monthID=?`

// get all
router.get('/', (req, res) => {
    callbacks.getAll(req, res, getAllPlantMonthly)
})

// add
router.post('/', (req, res) => {
    callbacks.addPost(req, res, insertPlantMonthly, attributes)
})

// get single
router.get('/:plantID/:monthID', (req, res) => {
    callbacks.getSingleComposite(req, res, getSinglePlantMonthly, req.params.plantID, req.params.monthID)
})

// update
router.put('/:plantID/:monthID', (req, res) => {
    callbacks.updateComposite(req, res, updatePlantMonthly, attributes, req.params.plantID, req.params.monthID)
})

router.delete('/:plantID/:monthID', (req, res) => {
    callbacks.deleteComposite(req, res, deletePlantMonthly, req.params.plantID, req.params.monthID)
})

module.exports = router