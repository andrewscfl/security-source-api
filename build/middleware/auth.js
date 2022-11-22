"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticate(request, response, next) {
    try {
        var tokenHeader = request.headers['authorization'];
        if (!tokenHeader)
            return response.status(403).json({ success: false, data: 'no token' });
        var token = tokenHeader.replace('Bearer ', '');
        var key = process.env.TOKEN_KEY;
        var user = jsonwebtoken_1.default.verify(token, key);
        request.user = user;
    }
    catch (error) {
        return response.status(401).send({ success: false, data: 'invalid token' });
    }
    return next();
}
exports.authenticate = authenticate;
