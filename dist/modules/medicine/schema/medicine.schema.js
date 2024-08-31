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
exports.MedicineCategoriesSchema = exports.MedicineCategories = exports.MedicineSchema = exports.Medication = exports.ReceiptSchema = exports.Receipt = void 0;
const constants_1 = require("../../../shared/constants");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Receipt = class Receipt extends mongoose_2.Document {
};
exports.Receipt = Receipt;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Receipt.prototype, "productDispensed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date(Date.now()) }),
    __metadata("design:type", Date)
], Receipt.prototype, "dateDispensed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Receipt.prototype, "directions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Receipt.prototype, "quantity", void 0);
exports.Receipt = Receipt = __decorate([
    (0, mongoose_1.Schema)()
], Receipt);
exports.ReceiptSchema = mongoose_1.SchemaFactory.createForClass(Receipt);
let Medication = class Medication extends mongoose_2.Document {
};
exports.Medication = Medication;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Medication.prototype, "productPrescribed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Medication.prototype, "productCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Medication.prototype, "productDosage", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Medication.prototype, "practitionerNote", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date(Date.now()) }),
    __metadata("design:type", Date)
], Medication.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Medication.prototype, "isDispensed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Receipt)
], Medication.prototype, "receipt", void 0);
exports.Medication = Medication = __decorate([
    (0, mongoose_1.Schema)()
], Medication);
exports.MedicineSchema = mongoose_1.SchemaFactory.createForClass(Medication);
let MedicineCategories = class MedicineCategories {
};
exports.MedicineCategories = MedicineCategories;
__decorate([
    (0, mongoose_1.Prop)({ default: constants_1.drugClasses }),
    __metadata("design:type", Array)
], MedicineCategories.prototype, "category", void 0);
exports.MedicineCategories = MedicineCategories = __decorate([
    (0, mongoose_1.Schema)()
], MedicineCategories);
exports.MedicineCategoriesSchema = mongoose_1.SchemaFactory.createForClass(MedicineCategories);
//# sourceMappingURL=medicine.schema.js.map