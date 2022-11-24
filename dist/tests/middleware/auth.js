"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var requireAuth = function (req, res, next) {
    try {
        var ourToken = process.env.SECRET_TOKEN;
        var authHeader = req.headers.authorization;
        var token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, ourToken);
        next();
    }
    catch (err) {
        res.sendStatus(401);
    }
};
exports.default = requireAuth;
