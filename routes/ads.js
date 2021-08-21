const express = require('express');
const database = require('../config/database');
const app = express();
const defaultAd = require('../mini-ad-server/src/utils/defaultAd.json');

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

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

    function filterResults(results){
        let length = results.length;

        switch(length) {
            case 2:
                results = two(results);
                break;
            case 1:
                results = one(results);
                break;
            default:
                results = ['me organizo 0']       
        }

        return results;

        function two(array) {
            let position1 = array[0];
            let position2 = array[1];
            let defaultAdPosition1A = defaultAd[0];
            let defaultAdPosition1B = defaultAd[1];
            let defaultAdPosition2A = defaultAd[2];
            let defaultAdPosition2B = defaultAd[3];
            let finalArray = [];
            
            if(position1.position === position2.position){
                let index = position1.position - 1;

                if(position1.priority < position2.priority){
                    if(index === 0) {
                        finalArray.push(position1);
                        finalArray.push(defaultAdPosition2A);
                    }else {
                        finalArray.push(defaultAdPosition1A);
                        finalArray.push(position1);
                    }
                    
                }else if(position1.priority > position2.priority) {
                    if(index === 0) {
                        finalArray.push(position2);
                        finalArray.push(defaultAdPosition2B);
                    }else {
                        finalArray.push(defaultAdPosition1B);
                        finalArray.push(position2);
                    }

                }else if(position1.priority === position2.priority) {
                    if(position1.views < position2.views) {
                        if(index === 0) {
                            finalArray.push(position1);
                            finalArray.push(defaultAdPosition2A);
                        }else {
                            finalArray.push(defaultAdPosition1A);
                            finalArray.push(position1);
                        }
                    }else if(position1.views > position2.views) {
                        if(index === 0) {
                            finalArray.push(position2);
                            finalArray.push(defaultAdPosition2B);
                        }else {
                            finalArray.push(defaultAdPosition1B);
                            finalArray.push(position2);
                        }
                    }else if(position1.views === position2.views) {
                        let randomPosition = random(1, 2);
                        if(index === 0) {
                            if(randomPosition === 1) {
                                finalArray.push(position1);
                                finalArray.push(defaultAdPosition2A);
                            } else {
                                finalArray.push(position2);
                                finalArray.push(defaultAdPosition2B);
                            }
                        }else {
                            if(randomPosition === 2) {
                                finalArray.push(defaultAdPosition1A);
                                finalArray.push(position1);
                            } else {
                                finalArray.push(defaultAdPosition1B);
                                finalArray.push(position2);
                            }
                        }

                    }
                } 
            }else {
                if(position1.position < position2.position) {
                    finalArray.push(position1);
                    finalArray.push(position2);
                }else {
                    finalArray.push(position2);
                    finalArray.push(position1);
                }
            }
            return finalArray;
        }

        function one(array) {
            let position1 = array[0];
            let defaultAdPosition1A = defaultAd[0];
            let defaultAdPosition1B = defaultAd[1];
            let defaultAdPosition2A = defaultAd[2];
            let defaultAdPosition2B = defaultAd[3];
            let finalArray = [];

            if(position1.position === 1) {
                finalArray.push(position1);

                let randomPosition = random(3, 4);
                if(randomPosition === 3) {
                    finalArray.push(defaultAdPosition2A);
                } else {
                    finalArray.push(defaultAdPosition2B);
                }   
            }else {
                let randomPosition = random(1, 2);
                if(randomPosition === 1) {
                    finalArray.push(defaultAdPosition1A);
                } else {
                    finalArray.push(defaultAdPosition1B);
                }
                
                finalArray.push(position1);
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
                        console.log(filteredresults);

                    } else {
                        filteredresults = filterResults(resultsTables);
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
                        console.log(filteredresults);
                    } else {
                        resultsTables = [];
                        filteredresults = filterResults(resultsTables);
                        console.log(filteredresults);
                    }
                });
            };

            res.json(filteredresults);
            
        })
        
        
       
       
    };
 
    
});

module.exports = app;