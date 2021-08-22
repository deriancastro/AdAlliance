const setValue = require('./setValue');
const addResults = require('./addResults');
const filterResults = require('./filterResults');
const database = require('../config/database');


function handleRequest (hour, res){
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

module.exports = handleRequest;

