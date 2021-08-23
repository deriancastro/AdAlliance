const defaultAd = require('../utils/defaultAd.json');
const random = require('./random');

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

module.exports = anyPosition;