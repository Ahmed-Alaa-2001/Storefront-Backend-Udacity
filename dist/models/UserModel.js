"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var database_1 = __importStar(require("../database"));
var UserModel = (function () {
    function UserModel() {
    }
    UserModel.prototype.createNewUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sql, hashPassword, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        sql = 'INSERT INTO users (email,user_name,first_name,last_name,password) VALUES ($1,$2,$3,$4,$5) returning id, email, user_name, first_name, last_name';
                        hashPassword = bcrypt_1.default.hashSync(user.password + database_1.pepper, parseInt(database_1.salt));
                        return [4, connect.query(sql, [
                                user.email,
                                user.user_name,
                                user.first_name,
                                user.last_name,
                                hashPassword,
                            ])];
                    case 2:
                        result = _a.sent();
                        connect.release();
                        console.log(result.rows[0]);
                        return [2, result.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("can't create (".concat(user.user_name, "): ").concat(err_1.message));
                    case 4: return [2];
                }
            });
        });
    };
    UserModel.prototype.login = function (userName, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sql, result, user, isValid, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        sql = 'SELECT * FROM users WHERE user_name=$1';
                        return [4, connect.query(sql, [userName])];
                    case 2:
                        result = _a.sent();
                        connect.release();
                        if (result.rows.length) {
                            user = result.rows[0];
                            isValid = bcrypt_1.default.compareSync(password + database_1.pepper, user.password);
                            if (isValid) {
                                return [2, user];
                            }
                        }
                        return [2, null];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("can't to login: ".concat(err_2.message));
                    case 4: return [2];
                }
            });
        });
    };
    UserModel.prototype.edit = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, hashPassword, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6\n                        RETURNING id, email, user_name, first_name,last_name";
                        hashPassword = bcrypt_1.default.hashSync(user.password + database_1.pepper, parseInt(database_1.salt));
                        return [4, connection.query(sql, [
                                user.email,
                                user.user_name,
                                user.first_name,
                                user.last_name,
                                hashPassword,
                                user.id
                            ])];
                    case 2:
                        result = _a.sent();
                        console.log(result.rows[0]);
                        connection.release();
                        return [2, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not update user: ".concat(user.user_name, ", ").concat(err_3.message));
                    case 4: return [2];
                }
            });
        });
    };
    UserModel.prototype.showAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT * FROM users';
                        return [4, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2, result.rows];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("couldn't retrieving users ".concat(err_4.message));
                    case 4: return [2];
                }
            });
        });
    };
    UserModel.prototype.showByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        sql = 'SELECT * FROM users WHERE id=($1)';
                        return [4, connect.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connect.release();
                        return [2, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not find user ".concat(id, ", ").concat(err_5.message));
                    case 4: return [2];
                }
            });
        });
    };
    UserModel.prototype.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM users RETURNING *';
                        return [4, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2, result.rows];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("couldn't retrieving users ".concat(err_6.message));
                    case 4: return [2];
                }
            });
        });
    };
    UserModel.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
                        return [4, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2, result.rows[0]];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Could not delete user ".concat(id, ", ").concat(err_7.message));
                    case 4: return [2];
                }
            });
        });
    };
    return UserModel;
}());
exports.UserModel = UserModel;
