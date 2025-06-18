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
exports.UpdateAdminDto = exports.RemoveAdminDto = exports.AdminDto = exports.CreateAdminDto = exports.ApproveHospitalDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const mongoose_2 = require("@nestjs/mongoose");
const admin_schema_1 = require("../schema/admin.schema");
class ApproveHospitalDto {
}
exports.ApproveHospitalDto = ApproveHospitalDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'hospital mongo uuid',
        type: mongoose_1.Types.ObjectId,
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], ApproveHospitalDto.prototype, "hospitalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin ethereum address',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEthereumAddress)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApproveHospitalDto.prototype, "adminAddress", void 0);
class CreateAdminDto {
}
exports.CreateAdminDto = CreateAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin name',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'profile picture url',
        type: String,
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'email address',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin ethereum address',
        type: String,
    }),
    (0, class_validator_1.IsEthereumAddress)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "walletAddress", void 0);
class AdminDto extends (0, mapped_types_1.PartialType)(admin_schema_1.Admin) {
}
exports.AdminDto = AdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", Number)
], AdminDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], AdminDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], AdminDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], AdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_2.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], AdminDto.prototype, "walletAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: 'admin' }),
    (0, mongoose_2.Prop)({ default: 'admin', required: true }),
    __metadata("design:type", String)
], AdminDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    (0, mongoose_2.Prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], AdminDto.prototype, "isAuthenticated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    (0, mongoose_2.Prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], AdminDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: mongoose_1.Types.ObjectId }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AdminDto.prototype, "_id", void 0);
class RemoveAdminDto {
}
exports.RemoveAdminDto = RemoveAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin ethereum address to authorize',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEthereumAddress)(),
    __metadata("design:type", String)
], RemoveAdminDto.prototype, "adminAddressToAuthorize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin ethereum address to remove',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEthereumAddress)(),
    __metadata("design:type", String)
], RemoveAdminDto.prototype, "adminAddressToRemove", void 0);
class UpdateAdminDto {
}
exports.UpdateAdminDto = UpdateAdminDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'admin name',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'profile picture url',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'admin email',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "email", void 0);
//# sourceMappingURL=admin.dto.js.map