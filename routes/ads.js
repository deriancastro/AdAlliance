const express = require('express');
const database = require('../config/database');
const app = express();
const handleRequest = require('../functions/handleRequest');


app.get('/',  (req, res) => {
    const header = req.headers;
    handleRequest(header.hour, res);      
});

app.patch('/', (req, res) => {
    const obj = req.body;
    const header = req.headers;
    console.log('idAd1: ' + header.idAd1 + ' tableAd1: ' + header.tableAd1 + ' idAd2: ' + header.idAd2 + ' tableAd2: ' + header.tableAd2 + ' object: ' + obj);
    /*handleUpdateViews(header.idAd1, header.tableAd1, header.idAd2, header.tableAd2, res);

    function handleUpdateViews(idAd1, tableAd1, idAd2, tableAd2, res) {
        console.log('idAd1: ' + idAd1 + ' idAd2: ' + idAd2 + ' tableAd1: ' + tableAd1 + ' tableAd2: ' + tableAd2);

        let sqlUpdateTable1 = `UPDATE table${tableAd1} SET views = views + 1 WHERE advert_id = ${idAd1}`;
        let sqlUpdateTable2 = `UPDATE table${tableAd2} SET views = views + 1 WHERE advert_id = ${idAd2}`;

        if(tableAd1 || tableAd2) {
            if(tableAd1 === 1 || tableAd1 === 2) {
                database.query (sqlUpdateTable1, (err, res) => {
                    if (err) {
                        res.status(400).json({
                            message: err
                        });
                        return;
                    }

                        res.status(200).json({
                        status: 200,
                        success: true
                    });
                });
            } else if(tableAd2 === 1 || tableAd2 === 2){
                database.query (sqlUpdateTable2, (err, res) => {
                    if (err) {
                        res.status(400).json({
                            message: err
                        });
                        return;
                    }

                        res.status(200).json({
                        status: 200,
                        success: true
                    });
                });
            }

        }else {
            console.log('no flags');
        }
    }*/
});

module.exports = app;