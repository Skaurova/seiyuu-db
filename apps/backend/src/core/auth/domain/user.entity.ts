export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: string;
  avatar: string | null;
  active: boolean;
  lastLogin: Date | null;
  roleId: string | null;
}
