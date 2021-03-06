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
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var newNoteDto_1 = __importDefault(require("./models/newNoteDto"));
var joiful_1 = require("joiful");
var noteDtoMapper_1 = __importDefault(require("./models/mappers/noteDtoMapper"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var RestInterface = /** @class */ (function () {
    function RestInterface(noteService) {
        var _this = this;
        this._router = express_1.default.Router();
        this._noteMapper = new noteDtoMapper_1.default();
        this.router.use('/notes', auth_1.default);
        this.router.use('/notes', express_1.default.json());
        this.router.get('/notes', express_async_handler_1.default(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, notes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this.extractUserId(req);
                        return [4 /*yield*/, noteService.selectNotesByAuthorId(userId)];
                    case 1:
                        notes = _a.sent();
                        res.status(200).send(notes);
                        return [2 /*return*/];
                }
            });
        }); }));
        this.router.get('/notes/:noteId', express_async_handler_1.default(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, note;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this.extractUserId(req);
                        return [4 /*yield*/, noteService.selectNoteById(req.params.noteId, userId)];
                    case 1:
                        note = _a.sent();
                        res.status(200).send(note);
                        return [2 /*return*/];
                }
            });
        }); }));
        this.router.delete('/notes/:noteId', express_async_handler_1.default(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, note;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this.extractUserId(req);
                        return [4 /*yield*/, noteService.deleteNote(req.params.noteId, userId)];
                    case 1:
                        note = _a.sent();
                        res.status(200).send(note);
                        return [2 /*return*/];
                }
            });
        }); }));
        this.router.post('/notes', express_async_handler_1.default(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var noteDto, userId, error, newNote, noteResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        noteDto = req.body;
                        userId = this.extractUserId(req);
                        error = joiful_1.validateAsClass(noteDto, newNoteDto_1.default).error;
                        if (!error) return [3 /*break*/, 1];
                        throw new Error(error.details[0].message);
                    case 1: return [4 /*yield*/, noteService.saveNote(this._noteMapper.newNoteDtoToNote(noteDto, userId))];
                    case 2:
                        newNote = _a.sent();
                        noteResponse = this._noteMapper.noteToPersistedNoteDto(newNote);
                        res.status(200).send(noteResponse);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); }));
        /*this.router.put('/notes/:noteId', asyncHandler(async (req, res, next) => {
            let noteDto: PersistedNoteDto = req.body;
            noteDto.noteId = req.params.noteId;
            const { error, value } = validateAsClass(noteDto, PersistedNoteDto);
            if(error){
                throw new Error(error.details[0].message);
            }
            else{
                let newNote = await noteService.saveNote(this._noteMapper.persistedNoteDtoToNote(req.body));
                res.status(200).send(newNote);
            }
        }));*/
        /**
         * Error handler route.
         * TODO: throw better errors and handle them based on their type
         */
        this.router.use('/notes', function (error, req, res, next) {
            if (error) {
                res.status(500).send(error.message);
            }
            else {
                next();
            }
        });
    }
    Object.defineProperty(RestInterface.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: true,
        configurable: true
    });
    RestInterface.prototype.extractUserId = function (req) {
        var jwtKey = process.env.JWT_SECRET;
        if (!jwtKey) {
            throw new Error("Server configuration error");
        }
        var userId;
        var token = req.header("x-auth-token");
        if (token && typeof token === "string") {
            var decoded = jsonwebtoken_1.default.verify(token, jwtKey);
            userId = decoded._id;
        }
        if (userId) {
            return userId;
        }
        else {
            throw new Error("Invalid authentication token, can't identify user");
        }
    };
    return RestInterface;
}());
exports.default = RestInterface;
