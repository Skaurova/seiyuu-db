import Cookies from "js-cookie";
import { api } from "@/infrastructure/api/axiosMiddleware";
import type { AuthResponse } from "@/interfaces/api/AuthResponse";
import User from "@/domains/auth/entities/User";

const COOKIE_NAME = "seiyuudb_auth";

function removeToken() {
  Cookies.remove(COOKIE_NAME, { sameSite: "Strict", secure: true });
}

function isExpired(exp: number): boolean {
  return Date.now() >= exp;
}

export const authService = {
  isAuthenticated(): boolean {
    const data = Cookies.get(COOKIE_NAME);
    if (!data) return false;

    try {
      const parsed = JSON.parse(data);
      return !isExpired(parsed.exp);
    } catch {
      return false;
    }
  },

  get user(): User | null {
    const cookie = Cookies.get(COOKIE_NAME);
    if (!cookie) return null;

    try {
      const parsed = JSON.parse(cookie);
      return new User(parsed.user); 
    } catch {
      return null;
    }
  },

  async login(login_id: string, password: string): Promise<void> {
    const res = await api.post<AuthResponse>("/auth/login", {
      login_id,
      password,
    });

    Cookies.set(
      COOKIE_NAME,
      JSON.stringify({
        exp: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
        token: res.data.token,
        user: res.data.user,
      }),
      { expires: 7, sameSite: "Strict", secure: true }
    );
  },

  async logout(): Promise<void> {
    try {
      await api.get("/auth/logout");
    } finally {
      removeToken();
    }
  },

  revoke() {
    removeToken();
  },
};

export default authService;
