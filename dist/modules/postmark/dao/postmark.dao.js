"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostmarkDao = void 0;
const constants_1 = require("../../../shared/constants");
const common_1 = require("@nestjs/common");
const postmark_1 = require("postmark");
let PostmarkDao = class PostmarkDao {
    provideClient() {
        const client = new postmark_1.ServerClient(constants_1.POSTMARK_SERVER_TOKEN);
        return client;
    }
};
exports.PostmarkDao = PostmarkDao;
exports.PostmarkDao = PostmarkDao = __decorate([
    (0, common_1.Injectable)()
], PostmarkDao);
//# sourceMappingURL=postmark.dao.js.map