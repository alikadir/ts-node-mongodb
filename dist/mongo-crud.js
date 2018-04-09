"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class MongoCrud {
    constructor() {
        this.collectionName = 'myUsers';
        this.dbName = 'sozluk';
        this.connectionString = 'mongodb://Genel:1453@ds041563.mlab.com:41563/sozluk';
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = (yield mongodb_1.MongoClient.connect(this.connectionString)).db(this.dbName);
        });
    }
    getAllUsers(req, res) {
        this.db.collection(this.collectionName).find({}).toArray().then(list => {
            res.send(list);
        });
    }
    getById(req, res) {
        this.db.collection(this.collectionName).findOne({ _id: req.params.id }, { projection: { name: true, age: true } }).then(result => {
            if (result)
                res.send(result);
            else
                res.status(404).end();
        });
    }
    createUser(req, res) {
        this.db.collection(this.collectionName).insertOne(req.body).then(ok => { res.status(201).send(ok); }).catch(err => res.status(409).end());
    }
    updateUser(req, res) {
        this.db.collection(this.collectionName).updateOne({ _id: req.params.id }, req.body).then(result => res.status(204).send(result)).catch(err => res.status(404).end());
    }
    deleteUser(req, res) {
        this.db.collection(this.collectionName).deleteOne({ _id: req.params.id }).then(result => res.status(204).end());
    }
}
exports.MongoCrud = MongoCrud;
//# sourceMappingURL=mongo-crud.js.map