export interface Annee {
  code: string;
  annee: string;
  debut: string;
  fin: string;
  fin_inscription: string;
  status?: boolean;
}

export interface CreateAnneeCredentials {
  code: string;
  annee: string;
  debut: string;
  fin: string;
  fin_inscription: string;
  status?: boolean;
}

export interface getAnneeCredentials {
  code: string;
}

export interface AnneeState {
  annees: Annee[];
  token: string | null;
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
