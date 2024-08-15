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
exports.HospitalSchema = exports.Hospital = exports.PharmacistSchema = exports.Pharmacist = exports.DoctorSchema = exports.Doctor = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Doctor = class Doctor {
};
exports.Doctor = Doctor;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, sparse: true }),
    __metadata("design:type", String)
], Doctor.prototype, "walletAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)([Number]),
    __metadata("design:type", Array)
], Doctor.prototype, "hospitalIds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Doctor.prototype, "profilePicture", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Doctor.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Doctor.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Doctor.prototype, "category", void 0);
exports.Doctor = Doctor = __decorate([
    (0, mongoose_1.Schema)()
], Doctor);
exports.DoctorSchema = mongoose_1.SchemaFactory.createForClass(Doctor);
let Pharmacist = class Pharmacist {
};
exports.Pharmacist = Pharmacist;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, sparse: true }),
    __metadata("design:type", String)
], Pharmacist.prototype, "walletAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)([Number]),
    __metadata("design:type", Array)
], Pharmacist.prototype, "hospitalIds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pharmacist.prototype, "profilePicture", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pharmacist.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pharmacist.prototype, "status", void 0);
exports.Pharmacist = Pharmacist = __decorate([
    (0, mongoose_1.Schema)()
], Pharmacist);
exports.PharmacistSchema = mongoose_1.SchemaFactory.createForClass(Pharmacist);
let Hospital = class Hospital {
};
exports.Hospital = Hospital;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, sparse: true }),
    __metadata("design:type", Number)
], Hospital.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Hospital.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Hospital.prototype, "admin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Hospital.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Hospital.prototype, "phoneNo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Hospital.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Hospital.prototype, "profilePicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Hospital.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: exports.DoctorSchema }] }),
    __metadata("design:type", Array)
], Hospital.prototype, "doctors", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: exports.PharmacistSchema }] }),
    __metadata("design:type", Array)
], Hospital.prototype, "pharmacists", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'pending' }),
    __metadata("design:type", String)
], Hospital.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'hospital' }),
    __metadata("design:type", String)
], Hospital.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Hospital.prototype, "regNo", void 0);
exports.Hospital = Hospital = __decorate([
    (0, mongoose_1.Schema)()
], Hospital);
exports.HospitalSchema = mongoose_1.SchemaFactory.createForClass(Hospital);
//# sourceMappingURL=hospital.schema.js.map