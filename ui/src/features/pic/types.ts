import type { Candident } from "../candident/types";

export interface Pic {
  vid: string;
  pic: File | string;
  cand: string;
  pcan: Candident;
}

export interface CreatePicCredentials {
  pid: string;
  file: File | string;
  cand: string;
}

export interface getPicCredentials {
  pid: string;
}

export interface PicState {
  pics: Pic[];
  token: string | null;
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
