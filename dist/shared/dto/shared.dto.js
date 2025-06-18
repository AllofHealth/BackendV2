"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionJoinedDto = exports.EntityCreatedDto = void 0;
class EntityCreatedDto {
    constructor(walletAddress, email, role) {
        this.walletAddress = walletAddress;
        this.email = email;
        this.role = role;
    }
}
exports.EntityCreatedDto = EntityCreatedDto;
class InstitutionJoinedDto {
    constructor(walletAddress, role) {
        this.walletAddress = walletAddress;
        this.role = role;
    }
}
exports.InstitutionJoinedDto = InstitutionJoinedDto;
//# sourceMappingURL=shared.dto.js.map