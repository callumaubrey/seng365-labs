const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('HTTP request: GET /');
});

app.post('/', function (req, res) {
    res.send('HTTP request: POST /');
});

app.put('/', function (req, res) {
    res.send('HTTP request: PUT /');
});

app.delete('/', function (req, res) {
    res.send('HTTP request: DELETE /');
});

app.listen(3000);
