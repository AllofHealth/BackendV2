"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMessages = exports.AdminErrors = void 0;
var AdminErrors;
(function (AdminErrors) {
    AdminErrors["NOT_FOUND"] = "admin not found";
    AdminErrors["FETCHING_ADMIN"] = "an error occurred while fetching admin";
    AdminErrors["AUTH_CHECK_ERROR"] = "an error occurred while checking auth status";
    AdminErrors["AUTH_ERROR"] = "an error occurred while authenticating admin";
    AdminErrors["ADMIN_EXIST"] = "admin already exists";
    AdminErrors["CREATE_ADMIN"] = "an error occurred while creating an admin";
    AdminErrors["ADMIN_REMOVED_ERROR"] = "an error occurred while removing admin";
    AdminErrors["HOSPITAL_NOT_FOUND"] = "hospital not found";
    AdminErrors["HOSPITAL_APPROVED_ALREADY"] = "hospital already approved";
    AdminErrors["INVALID_STATUS"] = "invalid hospital status";
    AdminErrors["HOSPITAL_APPROVE_ERROR"] = "an error occurred while approving hospital";
    AdminErrors["ADMIN_UPDATE_ERROR"] = "an error occurred while updating admin";
    AdminErrors["FETCHING_PRACTITIONERS"] = "an error occurred while fetching practitioners";
})(AdminErrors || (exports.AdminErrors = AdminErrors = {}));
var AdminMessages;
(function (AdminMessages) {
    AdminMessages["AUTH_SUCCESSFUL"] = "admin authenticated successfully";
    AdminMessages["CREATE_ADMIN"] = "admin created successfully";
    AdminMessages["ADMIN_REMOVED"] = "admin removed successfully";
    AdminMessages["HOSPITAL_APPROVED"] = "hospital approved successfully";
    AdminMessages["ADMIN_UPDATED"] = "admin updated successfully";
})(AdminMessages || (exports.AdminMessages = AdminMessages = {}));
//# sourceMappingURL=admin.data.js.map