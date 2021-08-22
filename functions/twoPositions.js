const defaultAd = require('../utils/defaultAd.json');
const random = require('./random');

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

module.exports = twoPositions;

