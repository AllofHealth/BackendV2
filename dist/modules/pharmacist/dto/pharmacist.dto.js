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
exports.DispenseMedicationDto = exports.UpdateMedicineDto = exports.AddMedicineDto = exports.UpdatePharmacistDto = exports.PharmacistDto = exports.CreatePharmacistDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("@nestjs/mongoose");
const patient_schema_1 = require("../../patient/schemas/patient.schema");
const pharmacist_schema_1 = require("../schema/pharmacist.schema");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
class CreatePharmacistDto {
}
exports.CreatePharmacistDto = CreatePharmacistDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePharmacistDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePharmacistDto.prototype, "hospitalIds", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePharmacistDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePharmacistDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePharmacistDto.prototype, "profilePicture", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePharmacistDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePharmacistDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEthereumAddress)(),
    __metadata("design:type", String)
], CreatePharmacistDto.prototype, "walletAddress", void 0);
class PharmacistDto {
}
exports.PharmacistDto = PharmacistDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", Number)
], PharmacistDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Number] }),
    (0, mongoose_1.Prop)([Number]),
    __metadata("design:type", Array)
], PharmacistDto.prototype, "hospitalIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], PharmacistDto.prototype, "numberOfApprovals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PharmacistDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PharmacistDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PharmacistDto.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PharmacistDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PharmacistDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PharmacistDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], PharmacistDto.prototype, "walletAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PharmacistDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: pharmacist_schema_1.InventorySchema }),
    (0, mongoose_1.Prop)({ type: pharmacist_schema_1.InventorySchema }),
    __metadata("design:type", pharmacist_schema_1.Inventory)
], PharmacistDto.prototype, "inventory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [pharmacist_schema_1.ApprovalListSchema] }),
    (0, mongoose_1.Prop)({ type: [{ type: pharmacist_schema_1.ApprovalListSchema }] }),
    __metadata("design:type", Array)
], PharmacistDto.prototype, "approvalList", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [patient_schema_1.PrescriptionsSchema] }),
    (0, mongoose_1.Prop)({ type: [{ type: patient_schema_1.PrescriptionsSchema }] }),
    __metadata("design:type", Array)
], PharmacistDto.prototype, "sharedPrescriptions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: 'pharmacist' }),
    (0, mongoose_1.Prop)({ default: 'pharmacist', required: true }),
    __metadata("design:type", String)
], PharmacistDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], PharmacistDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PharmacistDto.prototype, "_id", void 0);
class UpdatePharmacistDto {
}
exports.UpdatePharmacistDto = UpdatePharmacistDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePharmacistDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdatePharmacistDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePharmacistDto.prototype, "about", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePharmacistDto.prototype, "profilePicture", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePharmacistDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePharmacistDto.prototype, "phoneNumber", void 0);
class AddMedicineDto {
}
exports.AddMedicineDto = AddMedicineDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddMedicineDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AddMedicineDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AddMedicineDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddMedicineDto.prototype, "sideEffects", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddMedicineDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddMedicineDto.prototype, "category", void 0);
class UpdateMedicineDto {
}
exports.UpdateMedicineDto = UpdateMedicineDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMedicineDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateMedicineDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateMedicineDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMedicineDto.prototype, "sideEffects", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMedicineDto.prototype, "image", void 0);
class DispenseMedicationDto {
}
exports.DispenseMedicationDto = DispenseMedicationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DispenseMedicationDto.prototype, "productToDispense", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DispenseMedicationDto.prototype, "directions", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DispenseMedicationDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DispenseMedicationDto.prototype, "medicineId", void 0);
//# sourceMappingURL=pharmacist.dto.js.map