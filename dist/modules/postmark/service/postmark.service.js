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
exports.PostmarkService = void 0;
const common_1 = require("@nestjs/common");
const postmark_dao_1 = require("../dao/postmark.dao");
let PostmarkService = class PostmarkService {
    constructor(postmarkDao) {
        this.postmarkDao = postmarkDao;
    }
    async sendEmail(args) {
        const { to, otp } = args;
        try {
            const client = this.postmarkDao.provideClient();
            const result = await client.sendEmailWithTemplate({
                From: 'support@allofhealth.xyz',
                To: to,
                TemplateAlias: 'otp-1',
                TemplateModel: {
                    otp: otp,
                    company_name: 'AllofHealth',
                    product_name: 'AllofHealth',
                    company_address: 'Victoria Island, Lagos, Nigeria',
                },
            });
            if (result.ErrorCode) {
                return {
                    success: result.ErrorCode,
                    message: 'Something went wrong',
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                message: 'Email sent successfully',
            };
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.PostmarkService = PostmarkService;
exports.PostmarkService = PostmarkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postmark_dao_1.PostmarkDao])
], PostmarkService);
//# sourceMappingURL=postmark.service.js.map