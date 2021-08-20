const express = require('express');
const database = require('../config/database');
const app = express();

app.get('/ads', (req, res) => {
    const header = req.headers;
    console.log(header);
     handelRequest(header.position1, header.position2, header.hour);
   
    //let sql = `SELECT * FROM table1 WHERE hour = ${hour}`;


    function handelRequest(position1, position2, hour){
        let sqlTable1 = `SELECT * FROM table1 WHERE hour = ${hour}`
        let sqlTable2 = `SELECT * FROM table2 WHERE hour = ${hour}`

       
       // const table1 = sqlRequest(sqlTable1);
        // const table2 = sqlRequest(sqlTable2);
      
       database.query(sqlTable2, (err, result2) => {
            if(err) {
                res.status(400).json({
                    message: err
                });
                return;
            }
            
           
            if(result2.length) {
                console.log(result2);
                
                res.json(result2);
            }else {
                res.json({});
            };
        })
        
        //console.log(table1);
        //const data = [...sqlTable1, ...sqlTable2];
        
    };
 
    
});

module.exports = app;