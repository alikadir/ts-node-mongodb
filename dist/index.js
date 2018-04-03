"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongodb_1 = require("mongodb");
var app = express_1.default();
var mongoClient = require('mongodb').MongoClient;
app.use('/img', express_1.default.static(__dirname + '/img'));
app.get("/", function (req, res) { return res.sendFile(__dirname + '/index.html'); });
app.post('/user', function (req, res) {
    console.log(req);
    setTimeout(function () {
        for (var i = 0; i < 999999; i++) {
            console.log(i);
        }
        console.log(Date());
    }, 100);
    res.send('ok' + Date());
});
app.get('/mongo', function (req, res) {
    mongodb_1.MongoClient.connect('mongodb://Genel:1453@ds041563.mlab.com:41563/sozluk').then(function (client) {
        var db = client.db('sozluk');
        db.collection('users').find({}).toArray().then(function (list) {
            res.send(list);
        });
    });
    /*
    let cc =  await MongoClient.connect('mongodb://Genel:1453@ds041563.mlab.com:41563');
    let ddb = cc.db('sozluk');

    ddb.col
*/
});
app.listen(process.env.PORT || 1453, function () { return console.log('server basladi'); });
