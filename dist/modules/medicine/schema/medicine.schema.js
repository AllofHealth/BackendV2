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
exports.MedicineSchema = exports.Medicine = exports.ReceiptSchema = exports.Receipt = void 0;
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
let Medicine = class Medicine extends mongoose_2.Document {
};
exports.Medicine = Medicine;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Medicine.prototype, "productPrescribed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Medicine.prototype, "productCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Medicine.prototype, "practitionerNote", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date(Date.now()) }),
    __metadata("design:type", Date)
], Medicine.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Medicine.prototype, "isDispensed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Receipt)
], Medicine.prototype, "receipt", void 0);
exports.Medicine = Medicine = __decorate([
    (0, mongoose_1.Schema)()
], Medicine);
exports.MedicineSchema = mongoose_1.SchemaFactory.createForClass(Medicine);
//# sourceMappingURL=medicine.schema.js.map