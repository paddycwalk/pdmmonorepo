export interface BackendObject {
  id: string;
  restriction?: string | RegExp;
  name: string;
}

export interface ConfObj {
  isValidate: boolean;
  validate: (value: string, backendObject: BackendObject) => void;
}

export interface ConfMapData {
  name: string;
  value: ConfObj;
}

export interface PasswordRule {
  defaultRule: boolean; // Boolean!
  description: string; // String!
  loginExpireAfterDays: number | null; // Int
  name: string; // String!
  passwordExpireAfterDays: number | null; // Int
  passwordMinLength: number | null; // Int
  passwordMustContainLowercase: boolean; // Boolean!
  passwordMustContainNumbers: boolean; // Boolean!
  passwordMustContainSpecialCharacters: boolean; // String!
  passwordMustContainUppercase: boolean; // Boolean!
  passwordSameSignNotFollow: boolean; // Boolean!
  preventLastUsedPasswords: number; // Int!
  securityRoleId: string; // ID!
}

export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}
