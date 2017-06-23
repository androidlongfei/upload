var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

// import _ from 'lodash';
var _ = require('lodash')

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded


app.use(express.static(path.join(__dirname, 'src')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'src', 'upload.html'));
});

app.get('/upload', function (req, res) {
    res.sendFile(path.join(__dirname, 'src', 'upload.html'));
});

app.get('/demo', function (req, res) {
    res.sendFile(path.join(__dirname, 'src', 'demo.html'));
});

app.get('/demo1', function (req, res) {
    res.sendFile(path.join(__dirname, 'src', 'demo1.html'));
});

app.get('/pull', function (req, res) {
    res.sendFile(path.join(__dirname, 'src', 'pull.html'));
});


console.log('View demo at http://localhost:9000/');

app.listen(9000);
