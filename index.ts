import express from 'express';
import { MongoClient } from 'mongodb'
import { Worker } from 'cluster';
const app = express();


const mongoClient = require('mongodb').MongoClient;

app.use('/img', express.static(__dirname + '/img'));
app.get("/", (req, res) => res.sendFile(__dirname + '/index.html'));

app.post('/user', (req, res) => {

    console.log(req);

    setTimeout(() => {
        for (let i = 0; i < 999999; i++) {
            console.log(i);
        }
        console.log(Date());

    }, 100);

    res.send('ok' + Date());



})

app.get('/mongo', (req, res) => {
    MongoClient.connect('mongodb://Genel:1453@ds041563.mlab.com:41563/sozluk').then((client) => {
        let db = client.db('sozluk');
        db.collection('users').find({}).toArray().then(list => {
            res.send(list);
        });
    });
});
app.get('/mongo/:query', (req, res) => {

    MongoClient.connect('mongodb://Genel:1453@ds041563.mlab.com:41563/sozluk').then((client) => {
        let db = client.db('sozluk');
        let query = JSON.parse(req.params.query);
        console.log(query);
debugger
        db.collection('users').find(query).toArray().then(list => {
            res.send(list);
        });
    });

});




app.listen(process.env.PORT || 1453, () => console.log('server basladi'));
