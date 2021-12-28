const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

const callbacks = require('./callbacks')

const attributes = ['environID', 'regionID']

//queries
const getAllRegionEnv = `
SELECT re.environID, re.regionID, r.regionName, e.environName
FROM regionEnviron re
INNER JOIN environFactors e
    ON re.environID = e.environID
INNER JOIN regions r
    ON re.regionID = r.regionID
`
const insertRegionEnviron = `INSERT INTO regionEnviron
    (environID, regionID)
    VALUES (?, ?)`
const getSingleRegionEnviron = `SELECT * FROM regionEnviron
    WHERE environID = (?) AND regionID = (?)`
const updateRegionEnv = `UPDATE regionEnviron SET environID=?, regionID=?
    WHERE environID=? AND regionID=?`
const deleteRegionEnv = `DELETE FROM regionEnviron WHERE environID=? AND regionID=?`

// get all regionEnviron
router.get('/', (req, res) => {
    callbacks.getAll(req, res, getAllRegionEnv)
})

// add regionEnviron
router.post('/', (req, res) => {
    callbacks.addPost(req, res, insertRegionEnviron, attributes)
})

// get single
router.get('/:environID/:regionID', (req, res) => {
    callbacks.getSingleComposite(req, res, getSingleRegionEnviron, req.params.environID, req.params.regionID)
})

// update
router.put('/:environID/:regionID', (req, res) => {
    callbacks.updateComposite(req, res, updateRegionEnv, attributes, req.params.environID, req.params.regionID)
})

router.delete('/:environID/:regionID', (req, res) => {
    callbacks.deleteComposite(req, res, deleteRegionEnv, req.params.environID, req.params.regionID)
})

module.exports = router