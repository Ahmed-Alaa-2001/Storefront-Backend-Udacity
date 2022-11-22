"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../../controllers/UserControllers/AuthController");
var ShowAllController_1 = __importDefault(require("../../controllers/UserControllers/ShowAllController"));
var ShowOneController_1 = __importDefault(require("../../controllers/UserControllers/ShowOneController"));
var DeleteAllController_1 = __importDefault(require("../../controllers/UserControllers/DeleteAllController"));
var DeleteOneController_1 = __importDefault(require("../../controllers/UserControllers/DeleteOneController"));
var EditController_1 = __importDefault(require("../../controllers/UserControllers/EditController"));
var router = (0, express_1.Router)();
router.post('/signup', AuthController_1.postSignUp);
router.get('/showall', ShowAllController_1.default);
router.get('/show/:id', ShowOneController_1.default);
router.delete('/deleteall', DeleteAllController_1.default);
router.delete('/delete/:id', DeleteOneController_1.default);
router.patch('/edit/:id', EditController_1.default);
router.post('/login', AuthController_1.postLogIn);
exports.default = router;
