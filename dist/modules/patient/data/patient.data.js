"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientSuccess = exports.PatientErrors = void 0;
var PatientErrors;
(function (PatientErrors) {
    PatientErrors["PATIENT_EXISTS"] = "patient already exists";
    PatientErrors["PATIENT_CREATED_ERROR"] = "an error occurred while creating patient";
    PatientErrors["PATIENT_FETCH_ERROR"] = "an error occurred while fetching patients";
    PatientErrors["PATIENT_NOT_FOUND"] = "patient not found";
    PatientErrors["PATIENT_UPDATE_ERROR"] = "an error occurred while updating patient";
    PatientErrors["PATIENT_DELETE_ERROR"] = "an error occurred while deleting patient";
    PatientErrors["FAMILY_MEMBER_NOT_FOUND"] = "family member not found";
    PatientErrors["FAMILY_MEMBER_EXIST"] = "family member already exists";
    PatientErrors["FAMILY_MEMBER_ERROR"] = "an error occurred while adding family member";
    PatientErrors["FAMILY_MEMBER_LIST_ERROR"] = "no family member found";
    PatientErrors["FAMILY_MEMBER_FETCH_ERROR"] = "an error occurred while fetching family member";
    PatientErrors["FAMILY_MEMBER_UPDATE_ERROR"] = "an error occurred while updating family member";
    PatientErrors["FETCH_PRESCRIPTION_ERROR"] = "an error occurred while fetching prescriptions";
    PatientErrors["PRESCRIPTION_NOT_FOUND"] = "prescription not found";
    PatientErrors["INVALID_PRESCRIPTION_ID"] = "invalid prescription id";
    PatientErrors["PHARMACIST_NOT_FOUND"] = "pharmacist not found";
    PatientErrors["SHARE_PRESCRIPTION_ERROR"] = "an error occurred while sharing prescription";
    PatientErrors["DELETE_PRESCRIPTION_ERROR"] = "an error occurred while deleting prescription";
})(PatientErrors || (exports.PatientErrors = PatientErrors = {}));
var PatientSuccess;
(function (PatientSuccess) {
    PatientSuccess["PATIENT_CREATED"] = "patient created successfully";
    PatientSuccess["PATIENT_UPDATED"] = "patient updated successfully";
    PatientSuccess["PATIENT_DELETED"] = "patient deleted successfully";
    PatientSuccess["FAMILY_MEMBER_ADDED"] = "family member added successfully";
    PatientSuccess["FAMILY_MEMBER_FOUND"] = "family member found";
    PatientSuccess["FAMILY_MEMBER_UPDATED"] = "family member updated successfully";
    PatientSuccess["PRESCRIPTION_SHARED"] = "prescription shared successfully";
    PatientSuccess["PRESCRIPTION_DELETED"] = "prescription deleted successfully";
})(PatientSuccess || (exports.PatientSuccess = PatientSuccess = {}));
//# sourceMappingURL=patient.data.js.map