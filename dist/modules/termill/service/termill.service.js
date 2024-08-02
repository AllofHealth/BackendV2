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
exports.TermillService = void 0;
const common_1 = require("@nestjs/common");
const termill_dao_1 = require("../dao/termill.dao");
let TermillService = class TermillService {
    constructor(termillProvider) {
        this.termillProvider = termillProvider;
    }
    async sendSMS(data) {
        try {
            const url = this.termillProvider.provideUrl();
            const body = this.termillProvider.constructBody(data);
            console.log(body);
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!res) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'An error occurred while sending the SMS',
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                message: 'SMS sent successfully',
                data: res,
            };
        }
        catch (error) {
            console.error(error);
            throw new Error('An error occurred while sending the SMS');
        }
    }
};
exports.TermillService = TermillService;
exports.TermillService = TermillService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [termill_dao_1.TermillProvider])
], TermillService);
//# sourceMappingURL=termill.service.js.map