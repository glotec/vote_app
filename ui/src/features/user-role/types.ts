export interface UserRole {
  role_id: number;
  role_name: string;
}

export interface CreateUserRoleCredentials {
  role_name: string;
}

export interface getUserRoleCredentials {
  role_id: number;
}

export interface UserRoleState {
  roles: UserRole[];
  token: string | null;
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
