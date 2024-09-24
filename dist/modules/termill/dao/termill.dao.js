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
exports.TermillProvider = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../shared/constants");
let TermillProvider = class TermillProvider {
    constructor() {
        this.apiKey = constants_1.TERMILL_API_KEY;
        this.baseUrl = constants_1.TERMILL_BASE_URL;
        this.from = 'AllofHealth';
    }
    provideUrl() {
        return `${this.baseUrl}/api/sms/send`;
    }
    constructBody(data) {
        const body = {
            to: data.to,
            from: this.from,
            sms: data.sms,
            type: 'plain',
            api_key: this.apiKey,
            channel: 'generic',
        };
        return body;
    }
};
exports.TermillProvider = TermillProvider;
exports.TermillProvider = TermillProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TermillProvider);
//# sourceMappingURL=termill.dao.js.map