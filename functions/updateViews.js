const database = require('../config/database');

function updateViews(sqlUpdate1, sqlUpdate2, res) {
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
                };
            });           
        };
    });
};

module.exports = updateViews;