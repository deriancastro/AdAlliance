const twoPositions = require('./twoPositions');
const onePosition = require('./onePosition');
const anyPosition = require('./anyPosition');


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
}

module.exports = filterResults;