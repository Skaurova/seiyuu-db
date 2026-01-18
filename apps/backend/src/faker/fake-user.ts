export type FakeUser = {
  id: string;
  email: string;
  username: string;
  password: string;
  avatar: string | null;
  active: boolean;
  role: string | null;
  lastLogin: Date | null;
  roleId: string | null;
};

export const FAKE_USER: FakeUser = {
  id: '1',
  email: 'test@example.com',
  username: 'FakeUser',
  password: 'password',
  avatar: null,
  active: true,
  role: 'admin',
  lastLogin: null,
  roleId: null,
};
