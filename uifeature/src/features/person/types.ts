export interface Person {
  matricule: string;
  nom: string;
  prenom: string;
  genre: string;
  email: string;
  contact: string;
  lieu_naissance: string;
  date_naissance: string;
  etat_civil: string;
  nationalite: string;
  province: string;
  territoire: string;
  collectivite: string;
  photo?: string;
}

export interface CreatePersonCredentials {
  matricule: string;
  nom: string;
  prenom: string;
  genre: string;
  email: string;
  contact: string;
  lieu_naissance: string;
  date_naissance: string;
  etat_civil: string;
  nationalite: string;
  province: string;
  territoire: string;
  collectivite: string;
  photo?: string;
}

export interface getPersonCredentials {
  matricule: string;
}

export interface PersonState {
  persons: Person[];
  token: string | null;
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
