const updateViews = require('./updateViews');

function handleUpdateViews(idAd1, tableAd1, idAd2, tableAd2, res) {
    let sqlUpdateAd1 = `UPDATE table${tableAd1} SET views = views + 1 WHERE advert_id = ${idAd1}`;
    let sqlUpdateAd2 = `UPDATE table${tableAd2} SET views = views + 1 WHERE advert_id = ${idAd2}`;

    updateViews(sqlUpdateAd1, sqlUpdateAd2, res);
}

module.exports = handleUpdateViews;