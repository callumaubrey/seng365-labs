const express = require('express');

const app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

app.use(function (req, res, next) {
    res.status(400).send('404 Not Found');
});
