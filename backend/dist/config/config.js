"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.PORT = exports.config = exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Environment variables configuration
 */
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.config = {
    get isDev() {
        return exports.NODE_ENV === 'development';
    },
    get isTest() {
        return exports.NODE_ENV === 'test';
    },
    get isProd() {
        return exports.NODE_ENV === 'production';
    }
};
exports.PORT = process.env.PORT || 3000;
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ts-crud';
