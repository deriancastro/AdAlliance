function setValue(value, table, flag){
       table = value;
        table[0].flag = flag; 
        return table;
 };

module.exports = setValue;