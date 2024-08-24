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
exports.PostmarkDao = void 0;
const common_1 = require("@nestjs/common");
const postmark_1 = require("postmark");
const auth_configuration_1 = require("../../../shared/config/auth.configuration");
let PostmarkDao = class PostmarkDao {
    constructor(config) {
        this.config = config;
    }
    provideClient() {
        const client = new postmark_1.ServerClient(this.config.SERVER_TOKEN);
        return client;
    }
    async fetchTemplates() {
        const client = this.provideClient();
        return await client.getTemplates();
    }
};
exports.PostmarkDao = PostmarkDao;
exports.PostmarkDao = PostmarkDao = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_configuration_1.AuthConfiguration])
], PostmarkDao);
//# sourceMappingURL=postmark.dao.js.map