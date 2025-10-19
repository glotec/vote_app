export interface Candident {
  cid: string;
  name: string;
  cycle: string;
}

export interface CreateCandidentCredentials {
  cid: string;
  name: string;
  cycle: string;
}

export interface getCandidentCredentials {
  cid: string;
}

export interface CandidentState {
  cands: Candident[];
  token: string | null;
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
