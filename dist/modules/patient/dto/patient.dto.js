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
exports.CreateFamilyMemberApprovalDto = exports.CreateApprovalDto = exports.SharePrescriptionDto = exports.UpdateFamilyMemberDto = exports.CreateFamilyMemberDto = exports.UpdatePatientProfileDto = exports.PatientDto = exports.FamilyMemberDto = exports.CreatePatientDto = exports.PrescriptionDto = exports.ReceiptDto = exports.MedicalRecordDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("@nestjs/mongoose");
const medicine_dto_1 = require("../../medicine/dto/medicine.dto");
class MedicalRecordDto {
}
exports.MedicalRecordDto = MedicalRecordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'blockchain id' }),
    __metadata("design:type", Number)
], MedicalRecordDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], MedicalRecordDto.prototype, "principalPatient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], MedicalRecordDto.prototype, "doctorAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    __metadata("design:type", String)
], MedicalRecordDto.prototype, "diagnosis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], MedicalRecordDto.prototype, "doctorsName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], MedicalRecordDto.prototype, "hospitalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], MedicalRecordDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: mongoose_1.Types.ObjectId }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], MedicalRecordDto.prototype, "_id", void 0);
class ReceiptDto {
}
exports.ReceiptDto = ReceiptDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ReceiptDto.prototype, "productDispensed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], ReceiptDto.prototype, "dateDispensed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ReceiptDto.prototype, "directions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ReceiptDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ReceiptDto.prototype, "price", void 0);
class PrescriptionDto {
}
exports.PrescriptionDto = PrescriptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'id', description: 'blockchain id', type: Number }),
    __metadata("design:type", Number)
], PrescriptionDto.prototype, "recordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'doctorName', type: String }),
    __metadata("design:type", String)
], PrescriptionDto.prototype, "doctorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'doctorAddress',
        type: String,
        description: 'doctor ethereum address',
    }),
    __metadata("design:type", String)
], PrescriptionDto.prototype, "doctorAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'institution name', type: String }),
    __metadata("design:type", String)
], PrescriptionDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'patient name', type: String }),
    __metadata("design:type", String)
], PrescriptionDto.prototype, "patientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'patient ethereum address', type: String }),
    __metadata("design:type", String)
], PrescriptionDto.prototype, "patientAddress", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: [{ type: medicine_dto_1.MedicineDto }] }),
    __metadata("design:type", Array)
], PrescriptionDto.prototype, "medicine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'date', type: Date }),
    __metadata("design:type", Date)
], PrescriptionDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'status', type: String, default: 'pending' }),
    __metadata("design:type", String)
], PrescriptionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: mongoose_1.Types.ObjectId }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PrescriptionDto.prototype, "_id", void 0);
class CreatePatientDto {
}
exports.CreatePatientDto = CreatePatientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'id', description: 'blockchain id', type: Number }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePatientDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'name', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'age', type: Number }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePatientDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'email', type: String }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'phoneNo', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "phoneNo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'profilePicture', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'address', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'city', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'bloodGroup', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'genotype', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "genotype", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'walletAddress', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEthereumAddress)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "walletAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'category', default: 'patient', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "category", void 0);
class FamilyMemberDto {
}
exports.FamilyMemberDto = FamilyMemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'id', description: 'blockchain id', type: Number }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", Number)
], FamilyMemberDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'principalPatient', type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMemberDto.prototype, "principalPatient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'name', type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMemberDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'relationship', type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMemberDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'email', type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMemberDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'address', type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMemberDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'age', type: Number }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", Number)
], FamilyMemberDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'dob', type: Date }),
    (0, mongoose_2.Prop)({ sparse: true }),
    __metadata("design:type", Date)
], FamilyMemberDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'bloodGroup', type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMemberDto.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'genotype', type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMemberDto.prototype, "genotype", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'medicalRecords', type: [MedicalRecordDto] }),
    __metadata("design:type", Array)
], FamilyMemberDto.prototype, "medicalRecord", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: '_id', type: mongoose_1.Types.ObjectId }),
    (0, mongoose_2.Prop)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], FamilyMemberDto.prototype, "_id", void 0);
class PatientDto {
}
exports.PatientDto = PatientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'id', description: 'blockchain id', type: Number }),
    (0, mongoose_2.Prop)({ required: true, unique: true }),
    __metadata("design:type", Number)
], PatientDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'appointmentCount', type: Number, default: 0 }),
    (0, mongoose_2.Prop)(),
    __metadata("design:type", Number)
], PatientDto.prototype, "appointmentCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'name', type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], PatientDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'lastName', type: String }),
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], PatientDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'age', type: Number }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", Number)
], PatientDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'email', type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], PatientDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'phoneNo', type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], PatientDto.prototype, "phoneNo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'profilePicture', type: String }),
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], PatientDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'address', type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], PatientDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'city', type: String }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], PatientDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'walletAddress', type: String }),
    (0, mongoose_2.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], PatientDto.prototype, "walletAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'bloodGroup', type: String }),
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], PatientDto.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'genotype', type: String }),
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], PatientDto.prototype, "genotype", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'medicalRecords', type: [MedicalRecordDto] }),
    __metadata("design:type", Array)
], PatientDto.prototype, "medicalRecords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'prescriptions', type: [PrescriptionDto] }),
    __metadata("design:type", Array)
], PatientDto.prototype, "prescriptions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'familyMembers', type: [FamilyMemberDto] }),
    __metadata("design:type", Array)
], PatientDto.prototype, "familyMembers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'patient', type: String, default: 'patient' }),
    (0, mongoose_2.Prop)({ default: 'patient', required: true }),
    __metadata("design:type", String)
], PatientDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'isVerified', type: Boolean }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], PatientDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: '_id', type: mongoose_1.Types.ObjectId }),
    (0, mongoose_2.Prop)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PatientDto.prototype, "_id", void 0);
class UpdatePatientProfileDto {
}
exports.UpdatePatientProfileDto = UpdatePatientProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'name', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePatientProfileDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'lastName', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePatientProfileDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'age', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePatientProfileDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'email', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePatientProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'phoneNo', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], UpdatePatientProfileDto.prototype, "phoneNo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'profilePicture', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePatientProfileDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'address', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePatientProfileDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'city', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePatientProfileDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'bloodGroup', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePatientProfileDto.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'genotype', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePatientProfileDto.prototype, "genotype", void 0);
class CreateFamilyMemberDto {
}
exports.CreateFamilyMemberDto = CreateFamilyMemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'id', description: 'blockchainId', type: Number }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFamilyMemberDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'name', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFamilyMemberDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'profilePicture', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFamilyMemberDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'relationship', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFamilyMemberDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'email', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFamilyMemberDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'address', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFamilyMemberDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'age', type: Number }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFamilyMemberDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'dob', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFamilyMemberDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'bloodGroup', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFamilyMemberDto.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'genotype', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFamilyMemberDto.prototype, "genotype", void 0);
class UpdateFamilyMemberDto {
}
exports.UpdateFamilyMemberDto = UpdateFamilyMemberDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'name', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'profilePicture', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'relationship', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'email', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'address', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'age', type: Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateFamilyMemberDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'dob', type: Date }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UpdateFamilyMemberDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'bloodGroup', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'genotype', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "genotype", void 0);
class SharePrescriptionDto {
}
exports.SharePrescriptionDto = SharePrescriptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'prescriptionId',
        description: 'mongo id',
        type: mongoose_1.Types.ObjectId,
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], SharePrescriptionDto.prototype, "prescriptionId", void 0);
class CreateApprovalDto {
}
exports.CreateApprovalDto = CreateApprovalDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'recordId',
        description: 'an optional array of record id',
        type: [Number],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateApprovalDto.prototype, "recordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'doctorAddress',
        description: 'doctor ethereum address',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEthereumAddress)(),
    __metadata("design:type", String)
], CreateApprovalDto.prototype, "doctorAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'approvalType', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApprovalDto.prototype, "approvalType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'approvalDurationInSec', type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateApprovalDto.prototype, "approvalDurationInSec", void 0);
class CreateFamilyMemberApprovalDto {
}
exports.CreateFamilyMemberApprovalDto = CreateFamilyMemberApprovalDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'familyMemberId',
        description: 'family member blockchain id',
        type: Number,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFamilyMemberApprovalDto.prototype, "familyMemberId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'recordId',
        description: 'an optional array of record id',
        type: [Number],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateFamilyMemberApprovalDto.prototype, "recordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'doctorAddress',
        description: 'doctor ethereum address',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEthereumAddress)(),
    __metadata("design:type", String)
], CreateFamilyMemberApprovalDto.prototype, "doctorAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'approvalType', type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFamilyMemberApprovalDto.prototype, "approvalType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'approvalDurationInSec', type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFamilyMemberApprovalDto.prototype, "approvalDurationInSec", void 0);
//# sourceMappingURL=patient.dto.js.map