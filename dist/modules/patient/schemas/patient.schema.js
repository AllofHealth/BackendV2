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
exports.PatientSchema = exports.Patient = exports.FamilyMemberSchema = exports.FamilyMember = exports.PrescriptionsSchema = exports.Prescriptions = exports.MedicalRecordPreviewSchema = exports.MedicalRecordPreview = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MedicalRecordPreview = class MedicalRecordPreview extends mongoose_2.Document {
};
exports.MedicalRecordPreview = MedicalRecordPreview;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], MedicalRecordPreview.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MedicalRecordPreview.prototype, "principalPatient", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MedicalRecordPreview.prototype, "doctorAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MedicalRecordPreview.prototype, "diagnosis", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MedicalRecordPreview.prototype, "doctorsName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MedicalRecordPreview.prototype, "hospitalName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now() }),
    __metadata("design:type", Date)
], MedicalRecordPreview.prototype, "date", void 0);
exports.MedicalRecordPreview = MedicalRecordPreview = __decorate([
    (0, mongoose_1.Schema)()
], MedicalRecordPreview);
exports.MedicalRecordPreviewSchema = mongoose_1.SchemaFactory.createForClass(MedicalRecordPreview);
let Prescriptions = class Prescriptions extends mongoose_2.Document {
};
exports.Prescriptions = Prescriptions;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Prescriptions.prototype, "doctorName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Prescriptions.prototype, "recordId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Prescriptions.prototype, "patientName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Prescriptions.prototype, "patientAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Prescriptions.prototype, "doctorAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Prescriptions.prototype, "institutionName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Prescriptions.prototype, "medicineName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Prescriptions.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Prescriptions.prototype, "medicineId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Prescriptions.prototype, "medicineGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Prescriptions.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Prescriptions.prototype, "sideEffects", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now() }),
    __metadata("design:type", Date)
], Prescriptions.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Prescriptions.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Prescriptions.prototype, "dispensedDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Prescriptions.prototype, "dispensedBy", void 0);
exports.Prescriptions = Prescriptions = __decorate([
    (0, mongoose_1.Schema)()
], Prescriptions);
exports.PrescriptionsSchema = mongoose_1.SchemaFactory.createForClass(Prescriptions);
let FamilyMember = class FamilyMember extends mongoose_2.Document {
};
exports.FamilyMember = FamilyMember;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], FamilyMember.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMember.prototype, "principalPatient", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMember.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMember.prototype, "relationship", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMember.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMember.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], FamilyMember.prototype, "age", void 0);
__decorate([
    (0, mongoose_1.Prop)({ sparse: true }),
    __metadata("design:type", Date)
], FamilyMember.prototype, "dob", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMember.prototype, "bloodGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FamilyMember.prototype, "genotype", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: exports.MedicalRecordPreviewSchema, unique: true }] }),
    __metadata("design:type", Array)
], FamilyMember.prototype, "medicalRecord", void 0);
exports.FamilyMember = FamilyMember = __decorate([
    (0, mongoose_1.Schema)()
], FamilyMember);
exports.FamilyMemberSchema = mongoose_1.SchemaFactory.createForClass(FamilyMember);
let Patient = class Patient {
};
exports.Patient = Patient;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", Number)
], Patient.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Patient.prototype, "appointmentCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Patient.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Patient.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Patient.prototype, "age", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Patient.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Patient.prototype, "phoneNo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Patient.prototype, "profilePicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Patient.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Patient.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Patient.prototype, "walletAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Patient.prototype, "bloodGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Patient.prototype, "genotype", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: exports.MedicalRecordPreviewSchema, unique: true }] }),
    __metadata("design:type", Array)
], Patient.prototype, "medicalRecords", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: exports.PrescriptionsSchema, unique: true }] }),
    __metadata("design:type", Array)
], Patient.prototype, "prescriptions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: exports.FamilyMemberSchema, unique: true }] }),
    __metadata("design:type", Array)
], Patient.prototype, "familyMembers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'patient', required: true }),
    __metadata("design:type", String)
], Patient.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], Patient.prototype, "isVerified", void 0);
exports.Patient = Patient = __decorate([
    (0, mongoose_1.Schema)()
], Patient);
exports.PatientSchema = mongoose_1.SchemaFactory.createForClass(Patient);
//# sourceMappingURL=patient.schema.js.map