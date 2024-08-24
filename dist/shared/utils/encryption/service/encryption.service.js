"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const auth_configuration_1 = require("../../../config/auth.configuration");
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let EncryptionService = class EncryptionService {
    constructor(config) {
        this.config = config;
    }
    encrypt(args) {
        const { data, key } = args;
        const iv = crypto.randomBytes(16);
        let EncryptedKey = this.config.ENCRYPTION_KEY;
        console.log(EncryptedKey);
        console.log(this.config.SERVER_TOKEN);
        if (key)
            EncryptedKey = key;
        const BufferKey = Buffer.from(EncryptedKey, 'base64');
        const cipher = crypto.createCipheriv('aes-256-cbc', BufferKey, iv);
        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    }
    decrypt(args) {
        const { data, key } = args;
        const textParts = data.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let EncryptedKey = this.config.ENCRYPTION_KEY;
        if (key)
            EncryptedKey = key;
        const BufferKey = Buffer.from(EncryptedKey, 'base64');
        const decipher = crypto.createDecipheriv('aes-256-cbc', BufferKey, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_configuration_1.AuthConfiguration])
], EncryptionService);
//# sourceMappingURL=encryption.service.js.map