export enum PatientErrors {
  PATIENT_EXISTS = 'patient already exists',
  PATIENT_CREATED_ERROR = 'an error occurred while creating patient',
  FAMILY_MEMBER_EXIST = 'family member already exists',
  FAMILY_MEMBER_ERROR = 'an error occurred while adding family member',
}

export enum PatientSuccess {
  PATIENT_CREATED = 'patient created successfully',
  FAMILY_MEMBER_ADDED = 'family member added successfully',
}
