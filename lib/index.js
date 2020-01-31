"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var uuid_1 = __importDefault(require("uuid"));
exports.SEPERATOR = '$';
exports.ALGORITHM = 'sha512';
exports.hashPassword = function (password, salt) {
    var saltBuffer = Buffer.from(salt, 'utf8');
    var saltHex = saltBuffer.toString('hex');
    var salted_password = saltHex + password;
    var hasher = crypto_1.createHash(exports.ALGORITHM);
    var data = hasher.update(salted_password, 'utf8');
    var hashedPassword = data.digest('hex');
    return [exports.ALGORITHM, saltHex, hashedPassword].join(exports.SEPERATOR);
};
exports.createUser = function (username, password) { return ({
    username: username,
    storageHash: exports.hashPassword(password, uuid_1.default.v4()),
}); };
exports.authUser = function (password, storageHash) {
    var _a = storageHash.split(exports.SEPERATOR), algorithm = _a[0], saltHex = _a[1], hashedPassword = _a[2];
    var salted_password = saltHex + password;
    var hasher = crypto_1.createHash(algorithm);
    var data = hasher.update(salted_password, 'utf8');
    return hashedPassword === data.digest('hex');
};
//# sourceMappingURL=index.js.map