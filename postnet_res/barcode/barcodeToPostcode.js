/**
 * Created by weighing on 16-7-31.
 */
/*global module*/
class barcode{
     barcodeToPostcode(barcode) {
        if (!checkBarcodeLegal(barcode)) {
            return {
                success: false,
                value: 'invalid_barcode'
            }
        }
        let numBarcodeList = getNumBarcodeList();
        let delLinesBarcode = delFrame(barcode);
        let postcodeCheckDigit = MatchBarcodeNum(delLinesBarcode, numBarcodeList);
        let checkDigit = splitCheckDigit(postcodeCheckDigit);
        let postcode = splitPostcode(postcodeCheckDigit);
        let postcodeSum = calculatePostcodeSum(postcode);
        let rightCheckDigit = calculateRightCheckDigit(postcodeSum);
        let postcodeCheckResult = checkPostcodeValidity(checkDigit, rightCheckDigit);
        let wholePostcode = completePostcode(postcode);
        if (!postcodeCheckResult) {
            return {
                success: false,
                value: 'check_Digit_error!'
            }
        }
        return {
            success: true,
            value: wholePostcode
        }
    }
}

function getNumBarcodeList() {
    return ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
}

function checkBarcodeLegal(barcode) {
    let result = Array.from(barcode).every(function (element) {
        return element === "|" || element === " " || element === ":";
    });
    let result1 = barcode.slice(0, 2) === "| " && barcode.slice(barcode.length - 2, barcode.length);

    return result && result1 ;
}
function delFrame(barcode) {
    return barcode.slice(2, barcode.length - 2);
}
function MatchBarcodeNum(delLinesBarcode, numBarcodeList) {
    return delLinesBarcode.split(" ").map(function (element) {
        return numBarcodeList.indexOf(element);
    });
}
function splitCheckDigit(postcodeCheckDigit) {
    return parseInt(postcodeCheckDigit.slice(postcodeCheckDigit.length - 1, postcodeCheckDigit.length));
}
function splitPostcode(postcodeCheckDigit) {
    return postcodeCheckDigit.slice(0, postcodeCheckDigit.length - 1);
}
function calculatePostcodeSum(postcode) {
    return postcode.reduce(function (a, b) {
        return a + b;
    },0);
}
function calculateRightCheckDigit(postcodeSum) {
    return 10 - postcodeSum % 10;
}
function checkPostcodeValidity(checkDigit, rightCheckDigit) {
    return checkDigit === rightCheckDigit;
}
function completePostcode(postcode) {
    if (postcode.length === 9) {
        postcode.splice(5, 0, '-');
        return postcode.join("");
    } else {
        return postcode.join("");
    }
}
module.exports = barcode;
// module.exports = {
//     checkBarcodeLegal: checkBarcodeLegal,
//     delFrame: delFrame,
//     MatchBarcodeNum: MatchBarcodeNum,
//     splitCheckDigit: splitCheckDigit,
//     splitPostcode: splitPostcode,
//     calculatePostcodeSum: calculatePostcodeSum,
//     calculateRightCheckDigit: calculateRightCheckDigit,
//     checkPostcodeValidity: checkPostcodeValidity,
//     barcodeToPostcode: barcodeToPostcode,
//     completePostcode: completePostcode
// };

