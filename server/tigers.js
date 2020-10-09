// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for lions
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server
const express = require('express');
const datastore = require('./datastore');



const tigerRouter = express.Router();
const tigerStore = new datastore();

const flatten = key => ({id:key, ...tigerStore.find(key)[key]})

tigerRouter.param('id', (req,res,next,id) => {

    if (tigerStore.contains(id)) {
        res.send();
    } else {
        req.tiger = flatten(id);
        next();
    }
});

tigerRouter.get('/', (req, res) => {
    const tigers = Object.keys(tigerStore).map(flatten);
    res.json(tigers);
});

tigerRouter.get('/:id', (req, res) => {
    res.json(req.tiger || {});
});

tigerRouter.post('/', (req, res) => {
    const {key} = tigerStore.insert(req.body);
    res.json(flatten(key));
});

tigerRouter.put('/:id', (req, res) => {
    if(tigerStore.contains(req.params.id)) {
        tigerStore.update(req.params.id, req.body)
        res.json(flatten(req.params.id));
    } else {
        res.send();
    }
});
module.exports = tigerRouter;