export type RoleType = 'doctor' | 'pharmacist' | 'institution' | 'admin' | 'patient';
export interface OtpEntry {
    otp: string;
    expiresAt: number;
    role: RoleType;
}
