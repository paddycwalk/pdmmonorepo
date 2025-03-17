export interface PortalUser {
  active: boolean;
  availableApps: string[];
  firstName: string;
  lastName: string;
  email: string;
  mustChangePassword: boolean;
  userId: number;
  userName: string;
}
