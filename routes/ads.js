const express = require('express');
const database = require('../config/database');
const app = express();
const defaultAd = require('../utils/defaultAd.json');


app.get('/ads',  (req, res) => {
    const header = req.headers;
    handleRequest(header.hour);

    function setValue(value, table, flag){
        table = value;
        table[0].flag = flag; 
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
                results = twoPositions(results);
                break;
            case 1:
                results = onePosition(results);
                break;
            default:
                results = anyPosition();      
        }

        return results;

        function twoPositions(array) {
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
                        position1.flag = 1;
                        finalArray.push(position1);
                        finalArray.push(defaultAdPosition2A);
                    }else {
                        //für die Stunde 15, Prio: 1, advert_id: 7, position:2 und Tabelle 2
                        position1.flag = 2;
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

        function onePosition(array) {
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

        function anyPosition() {
            let defaultAdPosition1A = defaultAd[0];
            let defaultAdPosition1B = defaultAd[1];
            let defaultAdPosition2A = defaultAd[2];
            let defaultAdPosition2B = defaultAd[3];
            let finalArray = [];

            let randomPosition1 = random(1, 2);
                if(randomPosition1 === 1) {
                    finalArray.push(defaultAdPosition1A);
                } else {
                    finalArray.push(defaultAdPosition1B);
                }
            
            let randomPosition2 = random(3, 4);
                if(randomPosition2 === 3) {
                    finalArray.push(defaultAdPosition2A);
                } else {
                    finalArray.push(defaultAdPosition2B);
                } 

            return finalArray;
        }
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
                table2 = await setValue(result2, table2, 2);
    
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
                        table1 = await setValue(result1, table1, 1);
                        
                        resultsTables = addResults(table1, resultsTables);
                        filteredresults = filterResults(resultsTables);
                        console.log(filteredresults);
                        res.json(filteredresults);

                    } else {
                        filteredresults = filterResults(resultsTables);
                        console.log(filteredresults);
                        res.json(filteredresults);
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
                        table1 = await setValue(result1, table1, 1);
                        
                        resultsTables = addResults(table1, resultsTables);
                        filteredresults = filterResults(resultsTables);
                        console.log(filteredresults);
                        res.json(filteredresults);
                    } else {
                        resultsTables = [];
                        filteredresults = filterResults(resultsTables);
                        console.log(filteredresults);
                        res.json(filteredresults);
                    }
                });
            };
                      
        })  
    };    
});

app.post('/views/:idAd1/:tableAd1/:idAd2/:tableAd2', (req, res) => {
    const{idAd1, tableAd1, idAd2, tableAd2} = req.params;
    //console.log('idAd1: ' + idAd1 + ' idAd2: ' + idAd2 + ' tableAd1: ' + tableAd1 + ' tableAd2: ' + tableAd2);
    handleUpdateViews(idAd1, tableAd1, idAd2, tableAd2);

    function handleUpdateViews(idAd1, tableAd1, idAd2, tableAd2) {
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
    }
});

module.exports = app;