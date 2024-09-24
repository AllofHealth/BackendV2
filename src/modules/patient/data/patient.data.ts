export enum PatientErrors {
  PATIENT_EXISTS = 'patient already exists',
  PATIENT_CREATED_ERROR = 'an error occurred while creating patient',
  PATIENT_NOT_FOUND = 'patient not found',
  FAMILY_MEMBER_EXIST = 'family member already exists',
  FAMILY_MEMBER_ERROR = 'an error occurred while adding family member',
  FAMILY_MEMBER_LIST_ERROR = 'no family member found',
  FAMILY_MEMBER_FETCH_ERROR = 'an error occurred while fetching family member',
}

export enum PatientSuccess {
  PATIENT_CREATED = 'patient created successfully',
  FAMILY_MEMBER_ADDED = 'family member added successfully',
  FAMILY_MEMBER_FOUND = 'family member found',
}
