const express = require('express');
const database = require('../config/database');
const app = express();

app.get('/ads',  (req, res) => {
    const header = req.headers;
    //console.log(header);
     handleRequest(header.position1, header.position2, header.hour);
   
    //let sql = `SELECT * FROM table1 WHERE hour = ${hour}`;

    function setValue(value, table){
        table = value;
        return table;
    };

    function addResults(table, results){
        results = [...results, ...table];
        return results;
    }

    function handleRequest (position1, position2, hour){
        let sqlTable1 = `SELECT * FROM table1 WHERE hour = ${hour}`
        let sqlTable2 = `SELECT * FROM table2 WHERE hour = ${hour}`
        
        database.query (sqlTable2, async (err, result2) => {
            let resultsTables = [];
            
            if (err) {
                res.status(400).json({
                    message: err
                });
                return;
            }

            if (result2.length) {
                let table2;
                table2 = await setValue(result2, table2);
    
                resultsTables = addResults(table2, resultsTables);
                
                database.query (sqlTable1, async (err, result1) => {

                    if (err) {
                        res.status(400).json({
                            message: err
                        });
                        return;
                    }

                    if (result1.length) {
                        let table1;
                        table1 = await setValue(result1, table1);
                        
                        resultsTables = addResults(table1, resultsTables);
                        console.log(resultsTables);

                    } else {
                        console.log(resultsTables);
                    }
                });

            } else {
                database.query (sqlTable1, async (err, result1) => {

                    if (err) {
                        res.status(400).json({
                            message: err
                        });
                        return;
                    }

                    if (result1.length) {
                        let table1;
                        table1 = await setValue(result1, table1);
                        
                        resultsTables = addResults(table1, resultsTables);
                        console.log(resultsTables);
                    } else {
                        resultsTables = ['nada'];
                        console.log(resultsTables);
                    }
                });
            };

            res.json(resultsTables);
            
        })
        
        
       
       
    };
 
    
});

module.exports = app;