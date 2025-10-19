import type { UserRole } from "../user-role/types";

export interface User {
  fullname: string;
  username: string;
  password: string;
  is_connected?: boolean;
  activated?: boolean;
  role_id: number;
}

export interface Users {
  fullname: string;
  username: string;
  is_connected?: boolean;
  activated?: boolean;
  role_id: number;
  role?: UserRole;
}

export interface initialUsersState {
  users: Users[];
  loader: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface signupCredentials {
  fullname: string;
  username: string;
  password: string;
  is_connected?: boolean;
  activated?: boolean;
  role_id: number;
}

export interface AuthState {
  user: User | null;
  users: Users[];
  token: string | null;
  loading: boolean;
  loader: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
