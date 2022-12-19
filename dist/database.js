"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pepper = exports.salt = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, PG_HOST = _a.PG_HOST, PG_DB = _a.PG_DB, PG_USER = _a.PG_USER, PG_PASS = _a.PG_PASS, NODE_ENV = _a.NODE_ENV, PG_DB_TEST = _a.PG_DB_TEST, PEPPER = _a.PEPPER, SALT = _a.SALT;
exports.salt = SALT;
exports.pepper = PEPPER;
var client = new pg_1.Pool();
console.log(NODE_ENV);
if (NODE_ENV == 'dev') {
    client = new pg_1.Pool({
        host: PG_HOST,
        database: PG_DB,
        user: PG_USER,
        password: PG_PASS,
    });
}
if (NODE_ENV == 'test') {
    client = new pg_1.Pool({
        host: PG_HOST,
        database: PG_DB_TEST,
        user: PG_USER,
        password: PG_PASS
    });
}
exports.default = client;
