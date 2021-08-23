const express = require('express');
const app = express();
const handleRequest = require('../functions/handleRequest');
const handleUpdateViews = require('../functions/handleUpdateViews');

app.get('/',  (req, res) => {
    const header = req.headers;
    handleRequest(header.hour, res);      
});
 
app.patch('/', (req, res) => {
    const header = req.headers;
    handleUpdateViews(header.idad1, header.tablead1, header.idad2, header.tablead2, res);
});

module.exports = app;