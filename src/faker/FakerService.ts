import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const FAKE_DELAY = 300;

export const fileMap: Record<
  string,
  (config: InternalAxiosRequestConfig) => Promise<AxiosResponse> | AxiosResponse
> = {
  "POST /auth/login": async (config) => {
    const { email, password } = JSON.parse(config.data ?? "{}");

    if (email !== "test@example.com" || password !== "password") {
      return {
        data: { message: "Invalid credentials" },
        status: 401,
        statusText: "Unauthorized (fake)",
        headers: {},
        config,
      };
    }

    return {
      data: {
        token: "FAKE_TOKEN_123",
        user: {
          id: "1",
          username: "FakeUser",
          email: "test@example.com",
          role: "admin",
        },
      },
      status: 200,
      statusText: "OK (fake)",
      headers: {},
      config,
    };
  },

  "POST /auth/logout": () => {
    return {
      data: { success: true },
      status: 200,
      statusText: "OK (fake)",
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };
  },
};
