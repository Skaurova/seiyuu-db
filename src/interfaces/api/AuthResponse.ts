export interface AuthResponse {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      role: Object;  
      avatar?: string | null;
      active?: boolean;
      lastLogin?: string | null;
      roleId?: string | null;
    };
  }
  