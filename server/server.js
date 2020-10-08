// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions
// returns all lions
app.get('/lions', (req, res) => {
    res.json(lions);
});

// returns one lion represented by its id
app.get('/lions/:id', (req, res) => {
    res.json(lions.find(lion => lion.id === req.params.id) || {});
});

// create and return a new lion using the posted object as the lion
app.post('/lions', (req, res) => {
    console.log(req.body);
    let lion = req.body;
    id++;
    lion.id = id.toString();
    lions.push(lion);
    res.json(lion);
});

// updates and returns the matching lion with the posted update object
app.put('/lions/:id', (req, res) => {
    let new_lion = req.body;
    new_lion.id = req.params.id;

    lions = lions.filter(lion => lion.id !== req.params.id);
    lions.push(new_lion);

    res.json(new_lion);
});

// deletes and returns the matching lion
app.delete('/lions/:id', (req, res) => {
    const pred = lion => lion.id === req.params.id;
    let deleted_lion = lions.find(pred);
    lions = lions.filter(lion => !pred(lion));
    res.json(deleted_lion);

});

app.listen(3000);
console.log('on port 3000');
