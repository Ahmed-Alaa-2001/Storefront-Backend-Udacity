"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CreateController_1 = __importDefault(require("../../controllers/ProductControllers/CreateController"));
var ShowAllController_1 = __importDefault(require("../../controllers/ProductControllers/ShowAllController"));
var ShowOneController_1 = __importDefault(require("../../controllers/ProductControllers/ShowOneController"));
var DeleteAllController_1 = __importDefault(require("../../controllers/ProductControllers/DeleteAllController"));
var DeleteOneController_1 = __importDefault(require("../../controllers/ProductControllers/DeleteOneController"));
var EditController_1 = __importDefault(require("../../controllers/ProductControllers/EditController"));
var router = (0, express_1.Router)();
router.post('/', CreateController_1.default);
router.get('/', ShowAllController_1.default);
router.get('/:id', ShowOneController_1.default);
router.delete('/', DeleteAllController_1.default);
router.delete('/:id', DeleteOneController_1.default);
router.patch('/:id', EditController_1.default);
exports.default = router;
