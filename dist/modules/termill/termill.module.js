"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermillModule = void 0;
const common_1 = require("@nestjs/common");
const termill_service_1 = require("./service/termill.service");
const termill_dao_1 = require("./dao/termill.dao");
let TermillModule = class TermillModule {
};
exports.TermillModule = TermillModule;
exports.TermillModule = TermillModule = __decorate([
    (0, common_1.Module)({
        providers: [termill_service_1.TermillService, termill_dao_1.TermillProvider],
        exports: [termill_service_1.TermillService],
    })
], TermillModule);
//# sourceMappingURL=termill.module.js.map