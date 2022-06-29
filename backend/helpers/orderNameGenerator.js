const {strGenerator} = require('./strRandom')

function orderNameGenerator() {
    const firstStr = "asdw456"
    console.log(firstStr);
    const secondStr = "asdw4321"
    console.log(secondStr);
    let result = "codibook-" + firstStr + "-" + secondStr 
    console.log(result);
   return result;
}

module.exports = {
    orderNameGenerator
}