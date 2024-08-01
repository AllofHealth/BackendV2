export enum EmailFields {
  FROM = 'support@allofhealth.xyz',
  SUBJECT = 'OTP Verification',
  BODY = 'Your OTP is: ',
}

export interface PostMarkEmail {
  to: string;
  otp: string;
}
