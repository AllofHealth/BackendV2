"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServiceError = exports.ContractError = exports.MetamaskError = exports.PharmacistError = exports.HospitalError = exports.DoctorError = exports.HospitalServiceError = exports.PharmacistServiceError = exports.DoctorServiceError = exports.PatientServiceError = exports.PatientError = exports.AdminError = exports.EventNames = exports.ContractEvents = exports.ErrorCodes = exports.Relationship = exports.RecordOwner = exports.ApprovalStatus = exports.Category = void 0;
var Category;
(function (Category) {
    Category["Admin"] = "admin";
    Category["Doctor"] = "doctor";
    Category["Hospital"] = "hospital";
    Category["Pharmacist"] = "pharmacist";
    Category["Patient"] = "patient";
})(Category || (exports.Category = Category = {}));
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus["Approved"] = "approved";
    ApprovalStatus["Rejected"] = "rejected";
    ApprovalStatus["Pending"] = "pending";
})(ApprovalStatus || (exports.ApprovalStatus = ApprovalStatus = {}));
var RecordOwner;
(function (RecordOwner) {
    RecordOwner["Patient"] = "principal";
    RecordOwner["FamilyMember"] = "family member";
})(RecordOwner || (exports.RecordOwner = RecordOwner = {}));
var Relationship;
(function (Relationship) {
    Relationship["Father"] = "father";
    Relationship["Mother"] = "mother";
    Relationship["Brother"] = "brother";
    Relationship["Sister"] = "sister";
    Relationship["Aunt"] = "aunt";
    Relationship["Uncle"] = "uncle";
    Relationship["Nephew"] = "nephew";
    Relationship["Niece"] = "niece";
    Relationship["GrandFather"] = "grandfather";
    Relationship["GrandMother"] = "grandmother";
    Relationship["Grandson"] = "grandson";
    Relationship["Granddaughter"] = "granddaughter";
    Relationship["Son"] = "son";
    Relationship["Daughter"] = "daughter";
    Relationship["Wife"] = "wife";
    Relationship["Husband"] = "husband";
    Relationship["Friend"] = "friend";
    Relationship["Cousin"] = "cousin";
    Relationship["Other"] = "other";
})(Relationship || (exports.Relationship = Relationship = {}));
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["Success"] = 200] = "Success";
    ErrorCodes[ErrorCodes["NotFound"] = 404] = "NotFound";
    ErrorCodes[ErrorCodes["Error"] = 500] = "Error";
})(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
var ContractEvents;
(function (ContractEvents) {
    ContractEvents["PatientAdded"] = "event PatientAdded(address indexed patient, uint256 indexed patientId)";
    ContractEvents["DoctorAdded"] = "event DoctorAdded(address indexed doctor, uint256 indexed hospitalId, uint256 indexed doctorId)";
    ContractEvents["PharmacistAdded"] = "event PharmacistAdded(address indexed pharmacist, uint256 indexed hospitalId, uint256 indexed pharmacistId";
    ContractEvents["HospitalCreated"] = " event HospitalCreated(address indexed admin, uint256 indexed hospitalId)";
    ContractEvents["SystemAdminAdded"] = "event SystemAdminAdded(address indexed admin, uint256 indexed adminId)";
})(ContractEvents || (exports.ContractEvents = ContractEvents = {}));
var EventNames;
(function (EventNames) {
    EventNames["PatientAdded"] = "PatientAdded";
    EventNames["DoctorAdded"] = "DoctorAdded";
    EventNames["PharmacistAdded"] = "PharmacistAdded";
    EventNames["HospitalCreated"] = "HospitalCreated";
    EventNames["SystemAdminAdded"] = "SystemAdminAdded";
})(EventNames || (exports.EventNames = EventNames = {}));
class AdminError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AdminError';
    }
}
exports.AdminError = AdminError;
class PatientError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PatientError';
    }
}
exports.PatientError = PatientError;
class PatientServiceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PatientServiceError';
    }
}
exports.PatientServiceError = PatientServiceError;
class DoctorServiceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DoctorServiceError';
    }
}
exports.DoctorServiceError = DoctorServiceError;
class PharmacistServiceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PharmacistServiceError';
    }
}
exports.PharmacistServiceError = PharmacistServiceError;
class HospitalServiceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'HospitalServiceError';
    }
}
exports.HospitalServiceError = HospitalServiceError;
class DoctorError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DoctorError';
    }
}
exports.DoctorError = DoctorError;
class HospitalError extends Error {
    constructor(message) {
        super(message);
        this.name = 'HospitalError';
    }
}
exports.HospitalError = HospitalError;
class PharmacistError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PharmacistError';
    }
}
exports.PharmacistError = PharmacistError;
class MetamaskError extends Error {
    constructor(message) {
        super(message ? message : 'Metamask is not installed');
        this.name = 'MetamaskError';
    }
}
exports.MetamaskError = MetamaskError;
class ContractError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ContractError';
    }
}
exports.ContractError = ContractError;
class AdminServiceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AdminServiceError';
    }
}
exports.AdminServiceError = AdminServiceError;
//# sourceMappingURL=index.js.map