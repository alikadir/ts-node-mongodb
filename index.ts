import express from 'express';
import { MongoClient, Db } from 'mongodb'
import bodyParser from "body-parser";
import { MongoCrud } from './mongo-crud';


const mongoCrud = new MongoCrud();
const app = express();

/**
 * Static setting
 */
app.use('/img', express.static(__dirname + '/img'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



/**
 * Index page
 */
app.get("/", (req, res) => res.sendFile(__dirname + '/index.html'));



/**
 * User CRUD -- bind(instance) for using this in MongoCrud class
 */
app.get('/users',mongoCrud.getAllUsers.bind(mongoCrud));
app.get('/users/:id', mongoCrud.getById.bind(mongoCrud));
app.post('/users', mongoCrud.createUser.bind(mongoCrud));
app.put('/users/:id',mongoCrud.updateUser.bind(mongoCrud))
app.delete('/users/:id', mongoCrud.deleteUser.bind(mongoCrud));



/**
 * Handle 404 request 
 */
app.use("*", function (req, res) {
    res.status(404).send("page not found");
})


app.listen(1453, () => console.log('server started.'));
