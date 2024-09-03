export interface CreateAdminType {
  name: string;
  profilePicture?: string;
  email: string;
  walletAddress: string;
}

export interface AdminType extends CreateAdminType {
  category: string;
}

export interface RemoveAdminType {
  adminAddressToRemove: string;
}

export interface UpdateAdminProfileType {
  name?: string;
  profilePicture?: string;
  email?: string;
}

export interface AuthenticateAdminInterface {
  addressToAuthenticate: string;
  blockchainId: number;
}
