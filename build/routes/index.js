"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoutes = exports.GlobalRoutes = void 0;
var phishing_1 = __importDefault(require("./phishing"));
var accounts_1 = __importDefault(require("./accounts"));
exports.GlobalRoutes = [accounts_1.default];
exports.ProtectedRoutes = [phishing_1.default];
