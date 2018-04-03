"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
//const mongoClient = require('mongodb').MongoClient;
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
app.listen(process.env.PORT || 1453, function () { return console.log("server basladi"); });
