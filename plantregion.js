const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

const callbacks = require('./callbacks')

const attributes = ['plantID', 'regionID']

//queries
const getAllPlantRegion = `
SELECT pr.plantID, pr.regionID, r.regionName, p.plantName 
FROM plantRegionList pr
INNER JOIN plants p
    ON pr.plantID = p.plantID
INNER JOIN regions r
    ON pr.regionID = r.regionID
`
const insertPlantRegion = `INSERT INTO plantRegionList
    (plantID, regionID)
    VALUES (?, ?)`
const getSinglePlantRegion = `SELECT * FROM plantRegionList
    WHERE plantID =? AND regionID=?`
const updatePlantRegion = `UPDATE plantRegionList SET plantID=?, regionID=?
    where plantID =? AND regionID=?`
const deletePlantRegion = `DELETE FROM plantRegionList WHERE plantID =? AND regionID=?`

// get all
router.get('/', (req, res) => {
    callbacks.getAll(req, res, getAllPlantRegion)
})

// add
router.post('/', (req, res) => {
    callbacks.addPost(req, res, insertPlantRegion, attributes)
})

// get single
router.get('/:plantID/:regionID', (req, res) => {
    callbacks.getSingleComposite(req, res, getSinglePlantRegion, req.params.plantID, req.params.regionID)
})

// update
router.put('/:plantID/:regionID', (req, res) => {
    callbacks.updateComposite(req, res, updatePlantRegion, attributes, req.params.plantID, req.params.regionID)
})

router.delete('/:plantID/:regionID', (req, res) => {
    callbacks.deleteComposite(req, res, deletePlantRegion, req.params.plantID, req.params.regionID)
})

module.exports = router