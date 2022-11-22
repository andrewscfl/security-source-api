"use strict";
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
var express_1 = __importDefault(require("express"));
var client_1 = require("@prisma/client");
var helpers_1 = require("./helpers");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var prisma = new client_1.PrismaClient();
var accountRoutes = express_1.default.Router();
accountRoutes.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, organizationName, emailIsUnique, hashedPassword, account, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password, organizationName = _a.organizationName;
                if (!email || !password || !organizationName)
                    throw new Error("Missing Parameters");
                return [4 /*yield*/, helpers_1.checkOnlyEmail(email)];
            case 1:
                emailIsUnique = _b.sent();
                if (!emailIsUnique)
                    throw new Error("Email is not unique");
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, helpers_1.createAccount(email, hashedPassword, organizationName)];
            case 3:
                account = _b.sent();
                if (!account)
                    throw new Error('Account Creation Error');
                return [2 /*return*/, res.status(200).json({ success: true })];
            case 4:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        data: error_1.message
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); });
accountRoutes.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, account, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!(email && password))
                    throw new Error('No Username/Password');
                return [4 /*yield*/, helpers_1.findAccount(email)];
            case 1:
                account = _b.sent();
                token = jsonwebtoken_1.default.sign({ user_id: account.id, email: email }, (process.env.TOKEN_KEY), {
                    expiresIn: '10h'
                });
                return [2 /*return*/, res.status(200).json({ token: token })];
            case 2:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        data: error_2.message
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); });
accountRoutes.get('/', function (req, res) { return res.send('test'); });
var PhishingRoutes = {
    path: '/api/accounts',
    handler: accountRoutes
};
exports.default = PhishingRoutes;
