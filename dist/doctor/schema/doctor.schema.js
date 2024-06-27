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
exports.DoctorSchema = exports.Doctor = exports.ApprovalSchema = exports.Approval = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Approval = class Approval extends mongoose_2.Document {
};
exports.Approval = Approval;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Approval.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Approval.prototype, "patientName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Approval.prototype, "recordId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Approval.prototype, "profilePicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Approval.prototype, "approvalType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Approval.prototype, "approvalStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Approval.prototype, "approvalDuration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Approval.prototype, "recordOwner", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Approval.prototype, "recordTag", void 0);
exports.Approval = Approval = __decorate([
    (0, mongoose_1.Schema)()
], Approval);
exports.ApprovalSchema = mongoose_1.SchemaFactory.createForClass(Approval);
let Doctor = class Doctor {
};
exports.Doctor = Doctor;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, sparse: true }),
    __metadata("design:type", Number)
], Doctor.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)([Number]),
    __metadata("design:type", Array)
], Doctor.prototype, "hospitalIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Doctor.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Doctor.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Doctor.prototype, "profilePicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Doctor.prototype, "specialty", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Doctor.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Doctor.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Doctor.prototype, "walletAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Doctor.prototype, "numberOfApprovals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: exports.ApprovalSchema, unique: true }] }),
    __metadata("design:type", Array)
], Doctor.prototype, "activeApprovals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending', required: true }),
    __metadata("design:type", String)
], Doctor.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'doctor', required: true }),
    __metadata("design:type", String)
], Doctor.prototype, "category", void 0);
exports.Doctor = Doctor = __decorate([
    (0, mongoose_1.Schema)()
], Doctor);
exports.DoctorSchema = mongoose_1.SchemaFactory.createForClass(Doctor);
//# sourceMappingURL=doctor.schema.js.map