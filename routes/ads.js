const express = require('express');
const database = require('../config/database');
const app = express();

app.get('/ads',  (req, res) => {
    const header = req.headers;
    handleRequest(header.hour);

    function setValue(value, table){
        table = value;
        return table;
    };

    function addResults(table, results){
        results = [...results, ...table];
        return results;
    }

    function filterResults(results){
        let length = results.length;

        switch(length) {
            case 2:
                results = two(results)
                
                break;
            case 1:
                results = ['me organizo 1']
                
                break;
            default:
                results = ['me organizo 0']       
        }

        return results;

        function two(array) {
            let position1 = array[0];
            let position2 = array[1];
            let defaultAd = 'soy el random';
            let finalArray = [];
            
            if(position1.position === position2.position){
                let index = position1.position - 1;
                

                if(position1.priority < position2.priority){
                    if(index === 0) {
                        finalArray.push(position1);
                        finalArray.push(defaultAd);
                    }else {
                        finalArray.push(defaultAd);
                        finalArray.push(position1);
                    }
                    
                }
                //array = ['las posiciones son iguales caso 15, index: ' + index];

            }

            return finalArray;

        }

        //console.log(results.length);

    }

    function handleRequest (hour){
        let sqlTable1 = `SELECT * FROM table1 WHERE hour = ${hour}`
        let sqlTable2 = `SELECT * FROM table2 WHERE hour = ${hour}`
        
        database.query (sqlTable2, async (err, result2) => {
            let resultsTables = [];
            let filteredresults = [];
            
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
                        filteredresults = filterResults(resultsTables);
                        console.log(resultsTables);
                        console.log(filteredresults);

                    } else {
                        filteredresults = filterResults(resultsTables);
                        console.log(resultsTables);
                        console.log(filteredresults);
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
                        filteredresults = filterResults(resultsTables);
                        console.log(resultsTables);
                        console.log(filteredresults);
                    } else {
                        resultsTables = [];
                        filteredresults = filterResults(resultsTables);
                        console.log(resultsTables);
                        console.log(filteredresults);
                    }
                });
            };

            res.json(resultsTables);
            
        })
        
        
       
       
    };
 
    
});

module.exports = app;