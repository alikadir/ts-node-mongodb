"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongodb_1 = require("mongodb");
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
var mongoClient = require('mongodb').MongoClient;
app.use('/img', express_1.default.static(__dirname + '/img'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", function (req, res) { return res.sendFile(__dirname + '/index.html'); });
var connectionString = 'mongodb://Genel:1453@ds041563.mlab.com:41563/sozluk';
var db;
mongodb_1.MongoClient.connect('mongodb://Genel:1453@ds041563.mlab.com:41563/sozluk').then(function (client) {
    db = client.db('sozluk');
});
app.get('/users', function (req, res) {
    db.collection('myUsers').find({}).toArray().then(function (list) {
        res.send(list);
    });
});
app.get('/users/:id', function (req, res) {
    db.collection('myUsers').find({ _id: req.params.id }, { _id: 0, name: 1, age: 1 }).limit(1).next().then(function (result) {
        res.send(result);
    });
});
app.post('/users', function (req, res) {
    db.collection('myUsers').insertOne(req.body).then(function (ok) { res.send(ok); }).catch(function (err) {
        console.log(err);
    });
});
app.delete('/users/:id', function (req, res) {
    db.collection('myUsers').deleteOne({ _id: req.params.id }).then(function (list) {
        res.status(204).end();
    });
});
app.get('/mongo/:query', function (req, res) {
    var query = JSON.parse(req.params.query);
    console.log(query);
    db.collection('users').find(query).toArray().then(function (list) {
        res.send(list);
    });
});
app.listen(process.env.PORT || 1453, function () { return console.log('server basladi'); });
//# sourceMappingURL=index.js.map