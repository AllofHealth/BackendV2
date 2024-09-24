export enum PatientErrors {
  PATIENT_EXISTS = 'patient already exists',
  PATIENT_CREATED_ERROR = 'an error occurred while creating patient',
  PATIENT_FETCH_ERROR = 'an error occurred while fetching patients',
  PATIENT_NOT_FOUND = 'patient not found',
  PATIENT_UPDATE_ERROR = 'an error occurred while updating patient',
  PATIENT_DELETE_ERROR = 'an error occurred while deleting patient',
  FAMILY_MEMBER_NOT_FOUND = 'family member not found',
  FAMILY_MEMBER_EXIST = 'family member already exists',
  FAMILY_MEMBER_ERROR = 'an error occurred while adding family member',
  FAMILY_MEMBER_LIST_ERROR = 'no family member found',
  FAMILY_MEMBER_FETCH_ERROR = 'an error occurred while fetching family member',
  FAMILY_MEMBER_UPDATE_ERROR = 'an error occurred while updating family member',
  FETCH_PRESCRIPTION_ERROR = 'an error occurred while fetching prescriptions',
  PRESCRIPTION_NOT_FOUND = 'prescription not found',
  INVALID_PRESCRIPTION_ID = 'invalid prescription id',
  PHARMACIST_NOT_FOUND = 'pharmacist not found',
  SHARE_PRESCRIPTION_ERROR = 'an error occurred while sharing prescription',
  DELETE_PRESCRIPTION_ERROR = 'an error occurred while deleting prescription',
}

export enum PatientSuccess {
  PATIENT_CREATED = 'patient created successfully',
  PATIENT_UPDATED = 'patient updated successfully',
  PATIENT_DELETED = 'patient deleted successfully',
  FAMILY_MEMBER_ADDED = 'family member added successfully',
  FAMILY_MEMBER_FOUND = 'family member found',
  FAMILY_MEMBER_UPDATED = 'family member updated successfully',
  PRESCRIPTION_SHARED = 'prescription shared successfully',
  PRESCRIPTION_DELETED = 'prescription deleted successfully',
}
