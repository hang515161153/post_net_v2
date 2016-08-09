/*global module*/
class postcode {
    postcodeToBarcode(postcode) {
        let checkPostResult = checkPostcodeLegal(postcode);
        if (!checkPostResult) {
            return {
                success:false,
                value:'invalid_barcode'
            };
        }
        let numBarcodeLists = getNumBarcodeList();
        let postSum = calculatePosSum(postcode);
        let checkDigit = calculateCheckDigit(postSum);
        let newPostcode = connectPostcode(postcode, checkDigit);
        let barcode = putBarcode(newPostcode, numBarcodeLists);
        return {
            success:true,
            value:completeBarcode(barcode)
        };
    }
}

function getNumBarcodeList() {
    return ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
}
function checkPostcodeLegal(postcode) {
    let result = (postcode.length === 5 || postcode.length === 9 || postcode.length === 10);
    let result1 = Array.from(postcode).every(function (element) {
        return !isNaN(element) || element === "-";
    });
    return result && result1;
}
function calculatePosSum(postcode) {
    return Array.from(postcode).reduce(function (a, b) {
        return parseInt(a) + parseInt(b);
    });
}
function calculateCheckDigit(postSum) {
    return (10 - postSum % 10);
}
function connectPostcode(postcode, checkDigit) {
    return postcode + checkDigit;
}
function putBarcode(newPostcode, numBarcodeLists) {
    return Array.from(newPostcode).map(function (element) {
        return numBarcodeLists[element];
    });
}
function completeBarcode(barcode) {
    return "|" + barcode.join('') + "|";
}
module.exports = postcode;
// module.exports = {
//     checkPostcodeLegal: checkPostcodeLegal,
//     calculatePosSum: calculatePosSum,
//     calculateCheckDigit: calculateCheckDigit,
//     connectPostcode: connectPostcode,
//     putBarcode: putBarcode,
//     completeBarcode: completeBarcode,
//     postcodeToBarcode: postcodeToBarcode
//};
