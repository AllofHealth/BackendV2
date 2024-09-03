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
exports.AuthConfiguration = void 0;
const configify_1 = require("@itgorillaz/configify");
const class_validator_1 = require("class-validator");
let AuthConfiguration = class AuthConfiguration {
};
exports.AuthConfiguration = AuthConfiguration;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, configify_1.Value)('MONGODB_URI'),
    __metadata("design:type", String)
], AuthConfiguration.prototype, "MONGO_URI", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, configify_1.Value)('POSTMARK_SERVER_TOKEN'),
    __metadata("design:type", String)
], AuthConfiguration.prototype, "SERVER_TOKEN", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, configify_1.Value)('ENCRYPTION_KEY'),
    __metadata("design:type", String)
], AuthConfiguration.prototype, "ENCRYPTION_KEY", void 0);
exports.AuthConfiguration = AuthConfiguration = __decorate([
    (0, configify_1.Configuration)()
], AuthConfiguration);
//# sourceMappingURL=auth.configuration.js.map