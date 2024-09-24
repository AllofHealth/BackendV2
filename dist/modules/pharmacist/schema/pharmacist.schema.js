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
exports.PharmacistSchema = exports.Pharmacist = exports.InventorySchema = exports.Inventory = exports.ProductSchema = exports.Product = exports.MedicineSchema = exports.Medicine = exports.ApprovalListSchema = exports.ApprovalList = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const patient_schema_1 = require("../../patient/schemas/patient.schema");
let ApprovalList = class ApprovalList {
};
exports.ApprovalList = ApprovalList;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], ApprovalList.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ApprovalList.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], ApprovalList.prototype, "recordId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApprovalList.prototype, "profilePicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ApprovalList.prototype, "patientAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ApprovalList.prototype, "doctorAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ApprovalList.prototype, "approvalType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ApprovalList.prototype, "recordOwner", void 0);
exports.ApprovalList = ApprovalList = __decorate([
    (0, mongoose_1.Schema)()
], ApprovalList);
exports.ApprovalListSchema = mongoose_1.SchemaFactory.createForClass(ApprovalList);
let Medicine = class Medicine {
};
exports.Medicine = Medicine;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Medicine.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Medicine.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Medicine.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Medicine.prototype, "sideEffects", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Medicine.prototype, "image", void 0);
exports.Medicine = Medicine = __decorate([
    (0, mongoose_1.Schema)()
], Medicine);
exports.MedicineSchema = mongoose_1.SchemaFactory.createForClass(Medicine);
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: exports.MedicineSchema }] }),
    __metadata("design:type", Array)
], Product.prototype, "medications", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)()
], Product);
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
let Inventory = class Inventory {
};
exports.Inventory = Inventory;
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Inventory.prototype, "numberOfMedicine", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Inventory.prototype, "numberOfCategories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Inventory.prototype, "numberOfMedicineSold", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: exports.ProductSchema }], unique: true, default: [] }),
    __metadata("design:type", Array)
], Inventory.prototype, "products", void 0);
exports.Inventory = Inventory = __decorate([
    (0, mongoose_1.Schema)()
], Inventory);
exports.InventorySchema = mongoose_1.SchemaFactory.createForClass(Inventory);
let Pharmacist = class Pharmacist {
};
exports.Pharmacist = Pharmacist;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", Number)
], Pharmacist.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)([Number]),
    __metadata("design:type", Array)
], Pharmacist.prototype, "hospitalIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Pharmacist.prototype, "numberOfApprovals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Pharmacist.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pharmacist.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pharmacist.prototype, "about", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Pharmacist.prototype, "profilePicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Pharmacist.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Pharmacist.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Pharmacist.prototype, "walletAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Pharmacist.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.InventorySchema }),
    __metadata("design:type", Inventory)
], Pharmacist.prototype, "inventory", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: exports.ApprovalListSchema }] }),
    __metadata("design:type", Array)
], Pharmacist.prototype, "approvalList", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: patient_schema_1.PrescriptionsSchema }] }),
    __metadata("design:type", Array)
], Pharmacist.prototype, "sharedPrescriptions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pharmacist', required: true }),
    __metadata("design:type", String)
], Pharmacist.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], Pharmacist.prototype, "isVerified", void 0);
exports.Pharmacist = Pharmacist = __decorate([
    (0, mongoose_1.Schema)()
], Pharmacist);
exports.PharmacistSchema = mongoose_1.SchemaFactory.createForClass(Pharmacist);
//# sourceMappingURL=pharmacist.schema.js.map