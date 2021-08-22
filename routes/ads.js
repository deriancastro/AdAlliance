const express = require('express');
const database = require('../config/database');
const app = express();
const handleRequest = require('../functions/handleRequest');

app.get('/',  (req, res) => {
    const header = req.headers;
    handleRequest(header.hour, res);      
});
 
app.patch('/', (req, res) => {
    const header = req.headers;
    handleUpdateViews(header.idad1, header.tablead1, header.idad2, header.tablead2, res);

    function handleUpdateViews(idAd1, tableAd1, idAd2, tableAd2, res) {
        console.log('idAd1: ' + idAd1 + ' idAd2: ' + idAd2 + ' tableAd1: ' + tableAd1 + ' tableAd2: ' + tableAd2);

        let sqlUpdateAd1 = `UPDATE table${tableAd1} SET views = views + 1 WHERE advert_id = ${idAd1}`;
        let sqlUpdateAd2 = `UPDATE table${tableAd2} SET views = views + 1 WHERE advert_id = ${idAd2}`;

        updateViews(sqlUpdateAd1, sqlUpdateAd2);

        function updateViews(sqlUpdate1, sqlUpdate2) {
            database.query(sqlUpdate2, async (err) => {
                if (err) {
                    res.status(400).json({
                    message: err
                    });
                    return;
                } else {
                    database.query(sqlUpdate1, async (err) => {
                        if (err) {
                            res.status(400).json({
                            message: err
                            });
                            return;
                        } else {
                            return await res.status(200).json({
                                status: 200,
                                success: true
                            });   
                        }
                    });           
                }
            });
        }
    }
});

module.exports = app;