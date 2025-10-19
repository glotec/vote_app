export interface Client {
  client_id: string;
  fullname: string;
  contact: string;
  address: string;
}

export interface CreateClientCredentials {
  client_id: string;
  fullname: string;
  contact: string;
  address: string;
}

export interface getClientCredentials {
  client_id: string;
}

export interface ClientState {
  clients: Client[];
  token: string | null;
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
