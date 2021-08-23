const defaultAd = require('../utils/defaultAd.json');
const random = require('./random');

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
        };  
    }else {
        let randomPosition = random(1, 2);
        if(randomPosition === 1) {
            finalArray.push(defaultAdPosition1A);
        } else {
            finalArray.push(defaultAdPosition1B);
        };
        
        finalArray.push(position1);
    };
    return finalArray;
}

module.exports = onePosition;