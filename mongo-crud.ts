
import { MongoClient, Db } from 'mongodb'


export class MongoCrud {

    private db?: Db;
    private collectionName: string = 'myUsers';
    private dbName: string = 'sozluk';
    private connectionString: string = 'mongodb://ds041563.mlab.com:41563/sozluk';

    constructor() {
        this.connect();
    }
    private async connect() {
        this.db = (await MongoClient.connect(this.connectionString)).db(this.dbName);
    }
    getAllUsers(req, res) {
        this.db!.collection(this.collectionName).find({}).toArray().then(list => {
            res.send(list);
        });
    }
    getById(req, res) {
        this.db!.collection(this.collectionName).findOne({ _id: req.params.id }, { projection: { name: true, age: true } }).then(result => {
            if (result)
                res.send(result);
            else
                res.status(404).end();
        });
    }
    createUser(req, res) {
        this.db!.collection(this.collectionName).insertOne(req.body).then(ok => { res.status(201).send(ok) }).catch(err => res.status(409).end());
    }
    updateUser(req, res) {
        this.db!.collection(this.collectionName).updateOne({ _id: req.params.id }, req.body).then(result => res.status(204).send(result)).catch(err => res.status(404).end());
    }

    deleteUser(req, res) {
        this.db!.collection(this.collectionName).deleteOne({ _id: req.params.id }).then(result => res.status(204).end());
    }


}