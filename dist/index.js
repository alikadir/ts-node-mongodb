"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongo_crud_1 = require("./mongo-crud");
const mongoCrud = new mongo_crud_1.MongoCrud();
const app = express_1.default();
/**
 * Static setting
 */
app.use('/img', express_1.default.static(__dirname + '/img'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
/**
 * Index page
 */
app.get("/", (req, res) => res.sendFile(__dirname + '/index.html'));
/**
 * User CRUD -- bind(instance) for using this in MongoCrud class
 */
app.get('/users', mongoCrud.getAllUsers.bind(mongoCrud));
app.get('/users/:id', mongoCrud.getById.bind(mongoCrud));
app.post('/users', mongoCrud.createUser.bind(mongoCrud));
app.put('/users/:id', mongoCrud.updateUser.bind(mongoCrud));
app.delete('/users/:id', mongoCrud.deleteUser.bind(mongoCrud));
/**
 * Handle 404 request
 */
app.use("*", function (req, res) {
    res.status(404).send("page not found");
});
app.listen(1453, () => console.log('server started.'));
//# sourceMappingURL=index.js.map