const express = require('express')
const mysql = require('../dbcon')

const getAll = (req, res, query) => {
    mysql.pool.query(query, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

const addPost = (req, res, query, attributes) => {
    let content = req.body
    let inputs = []
    attributes.forEach(element => {
        inputs.push(content[element])
    });

    mysql.pool.query(query, (inputs), (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

const getSingle = (req, res, query, id) => {
    mysql.pool.query(query, (id), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

const getSingleComposite = (req, res, query, id1, id2) => {
    mysql.pool.query(query, ([id1, id2]), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })    
}

const updatePut = (req, res, query, attributes, id) => {
    let content = req.body
    let inputs = []
    attributes.forEach(element => {
        inputs.push(content[element])
    })
    inputs.push(id)

    mysql.pool.query(query, (inputs), (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result)
        }
    } )
}

const updateComposite = (req, res, query, attributes, id1, id2) => {
    let content = req.body
    let inputs = []
    attributes.forEach(element => {
        inputs.push(content[element])
    })
    inputs.push(id1, id2)

    mysql.pool.query(query, (inputs), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

const deleteSingle = (req, res, query, id) => {
    mysql.pool.query(query, (id), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

const deleteComposite = (req, res, query, id1, id2) => {
    mysql.pool.query(query, ([id1, id2]), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

exports.getAll = getAll
exports.addPost = addPost
exports.getSingle = getSingle
exports.updatePut = updatePut
exports.deleteSingle = deleteSingle
exports.getSingleComposite = getSingleComposite
exports.updateComposite = updateComposite
exports.deleteComposite = deleteComposite