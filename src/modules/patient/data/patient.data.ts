export enum PatientErrors {
  PATIENT_EXISTS = 'patient already exists',
  PATIENT_CREATED_ERROR = 'an error occurred while creating patient',
  PATIENT_FETCH_ERROR = 'an error occurred while fetching patients',
  PATIENT_NOT_FOUND = 'patient not found',
  PATIENT_UPDATE_ERROR = 'an error occurred while updating patient',
  FAMILY_MEMBER_NOT_FOUND = 'family member not found',
  FAMILY_MEMBER_EXIST = 'family member already exists',
  FAMILY_MEMBER_ERROR = 'an error occurred while adding family member',
  FAMILY_MEMBER_LIST_ERROR = 'no family member found',
  FAMILY_MEMBER_FETCH_ERROR = 'an error occurred while fetching family member',
  FAMILY_MEMBER_UPDATE_ERROR = 'an error occurred while updating family member',
}

export enum PatientSuccess {
  PATIENT_CREATED = 'patient created successfully',
  PATIENT_UPDATED = 'patient updated successfully',
  FAMILY_MEMBER_ADDED = 'family member added successfully',
  FAMILY_MEMBER_FOUND = 'family member found',
  FAMILY_MEMBER_UPDATED = 'family member updated successfully',
}
