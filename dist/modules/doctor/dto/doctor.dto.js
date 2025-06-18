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
exports.CreateMedicalRecordDto = exports.CreatePrescriptionDto = exports.UpdateDoctorDto = exports.DoctorDto = exports.CreateDoctorDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("@nestjs/mongoose");
const doctor_schema_1 = require("../schema/doctor.schema");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
class CreateDoctorDto {
}
exports.CreateDoctorDto = CreateDoctorDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateDoctorDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDoctorDto.prototype, "hospitalIds", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "profilePicture", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "specialty", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEthereumAddress)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "walletAddress", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "status", void 0);
class DoctorDto {
}
exports.DoctorDto = DoctorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, mongoose_1.Prop)({ required: true, unique: true, sparse: true }),
    __metadata("design:type", Number)
], DoctorDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Number] }),
    (0, mongoose_1.Prop)([Number]),
    __metadata("design:type", Array)
], DoctorDto.prototype, "hospitalIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DoctorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DoctorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DoctorDto.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DoctorDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DoctorDto.prototype, "specialty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DoctorDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DoctorDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], DoctorDto.prototype, "walletAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 0 }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], DoctorDto.prototype, "numberOfApprovals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [doctor_schema_1.ApprovalSchema] }),
    (0, mongoose_1.Prop)({ type: [{ type: doctor_schema_1.ApprovalSchema, unique: true }] }),
    __metadata("design:type", Array)
], DoctorDto.prototype, "activeApprovals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 'pending' }),
    (0, mongoose_1.Prop)({ default: 'pending', required: true }),
    __metadata("design:type", String)
], DoctorDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 'doctor' }),
    (0, mongoose_1.Prop)({ default: 'doctor', required: true }),
    __metadata("design:type", String)
], DoctorDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], DoctorDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], DoctorDto.prototype, "_id", void 0);
class UpdateDoctorDto {
}
exports.UpdateDoctorDto = UpdateDoctorDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDoctorDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDoctorDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDoctorDto.prototype, "about", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDoctorDto.prototype, "profilePicture", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDoctorDto.prototype, "specialty", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDoctorDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], UpdateDoctorDto.prototype, "phoneNumber", void 0);
class CreatePrescriptionDto {
}
exports.CreatePrescriptionDto = CreatePrescriptionDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePrescriptionDto.prototype, "recordId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreatePrescriptionDto.prototype, "medicine", void 0);
class CreateMedicalRecordDto {
}
exports.CreateMedicalRecordDto = CreateMedicalRecordDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateMedicalRecordDto.prototype, "recordId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMedicalRecordDto.prototype, "diagnosis", void 0);
//# sourceMappingURL=doctor.dto.js.map