'use strict';
/*global require */
const express = require('express');
//const cors = require('cors');
const app = express();
const postcode = require('./postnet_res/barcode/postcodeToBarcode');
const barcode = require('./postnet_res/barcode/barcodeToPostcode');

app.use(express.static("public"));
//app.use(cors());

app.get('/postcode', function (request, response) {
    response.send(new postcode().postcodeToBarcode(request.query.code));
});

app.get('/barcode', function (request, response) {

    response.send(new barcode().barcodeToPostcode(request.query.code));

});
// app.post('/postcode', function (request, response) {
//
//     console.log(123);
//     response.status(200).send(new postcode().postcodeToBarcode(request.body.code));
//     response.status(404).send("not found");
//
// });
//
// app.post('/barcode', function (request, response) {
//
//
//     response.status(200).send(new barcode().barcodeToPostcode(request.body.code));
//     response.status(404).send("not found");
// });

let server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
