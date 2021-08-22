function addResults(table, results){
    results = [...results, ...table];
    return results;
}

module.exports = addResults;