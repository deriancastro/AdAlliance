const express = require('express');
const database = require('./config/database');
const app = express();
const port = 4000;

database.connect((err) => {
    if(err){
        throw err;
    }
});

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.get('/test', (req, res) => {
    let sql = `SELECT * FROM table1`;

    database.query(sql, (err, result) => {
        if(err) {
            res.status(400).send(err);
            return;
        }

        if(result.length) {
            res.json(result);
        }else {
            res.json({});
        };
    });
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
});