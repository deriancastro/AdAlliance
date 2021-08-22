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

app.use('/api/ads', require('./routes/ads'));

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
});