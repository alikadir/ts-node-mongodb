import express from 'express';
import { MongoClient, Db } from 'mongodb'
import bodyParser from "body-parser";
const app = express();


const mongoClient = require('mongodb').MongoClient;


app.use('/img', express.static(__dirname + '/img'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(__dirname + '/index.html'));


const connectionString = 'mongodb://Genel:1453@ds041563.mlab.com:41563/sozluk';
var db: Db;
MongoClient.connect('mongodb://Genel:1453@ds041563.mlab.com:41563/sozluk').then((client) => {
    db = client.db('sozluk');
});





app.get('/users', (req, res) => {
    db.collection('myUsers').find({}).toArray().then(list => {
        res.send(list);
    });
});

app.get('/users/:id', (req, res) => {
    db.collection('myUsers').find({ _id: req.params.id }, {_id:0, name: 1, age: 1 }).limit(1).next().then(result => {
        res.send(result)
    });
});

app.post('/users', (req, res) => {
    db.collection('myUsers').insertOne(req.body).then(ok => { res.send(ok) }).catch(err => {
        console.log(err);
    });
});

app.delete('/users/:id', (req, res) => {
    db.collection('myUsers').deleteOne({ _id: req.params.id }).then(list => {
        res.status(204).end();
    });
});

app.get('/mongo/:query', (req, res) => {
    let query = JSON.parse(req.params.query);
    console.log(query);
    db.collection('users').find(query).toArray().then(list => {
        res.send(list);
    });
});

app.listen(process.env.PORT || 1453, () => console.log('server basladi'));
