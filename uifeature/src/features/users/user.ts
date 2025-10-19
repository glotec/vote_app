export interface User {
  fullname: string;
  username: string;
  is_connected: boolean;
  activated: boolean;
}


export interface UserState {
  user: User | null;
  token: string | null;
  loading:  "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}