const express = require('express');
const database = require('../config/database');
const app = express();

app.get('/ads1', (req, res) => {
    let sql = `SELECT * FROM table1`;

    database.query(sql, (err, result) => {
        if(err) {
            res.status(400).json({
                message: err
            });
            return;
        }

        if(result.length) {
            res.json(result);
        }else {
            res.json({});
        };
    });
});

app.get('/ads2', (req, res) => {
    let sql = `SELECT * FROM table2`;

    database.query(sql, (err, result) => {
        if(err) {
            res.status(400).json({
                message: err
            });
            return;
        }

        if(result.length) {
            res.json(result);
        }else {
            res.json({});
        };
    });
});

module.exports = app;