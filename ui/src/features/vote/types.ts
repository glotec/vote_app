export interface Vote {
  vid: string;
  count: number;
  cvote?: VoteCandidate;
  candident: string;
}

export interface CreateVoteCredentials {
  vid: string;
  // code: string;
  candident: string;
}

export interface getVoteCredentials {
  vid: string;
}

// export interface VoteState {
//   votes: Vote[];
//   count: number; // ✅ Add this line
//   token: string | null;
//   loading: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// export interface VoteState {
//   votes: Vote[];
//   voteCand: VoteWithCandidate[]; // ← full vote objects
//   count: number; // ← total number of votes
//   grouped: VoteCount[]; // ← count by candident
//   token: string | null;
//   loading: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }
export interface VoteState {
  votes: Vote[];
  voteCand: VoteWithCandidate[];
  count: number;
  grouped: VoteStat[];  // <-- this now matches the shape of your grouped data with candidate info
  token: string | null;
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}


// export interface VoteStat {
//   candident: string;
//   count: number;
//   candidate: {
//     cid: string;
//     name: string;
//     cycle: string;
//     status: boolean;
//     pic?: string;
//   };
// }

export interface VoteStat {
  candident: string;
  count: number;
  candidate: {
    cid: string;
    name: string;
    cycle: string;
    status: boolean;
    pic?: string; // optional, your example doesn't have this prop
  };
}


export interface VoteCount {
  candident: string;
  count: number;
}

export interface VotePic {
  pid: string;
  cand: string;
  pic: string;
}

// export interface VoteCandidate {
//   cid: string;
//   name: string;
//   cycle: string;
//   status: boolean;
//   pics: VotePic[];
// }

export interface VoteCandidate {
  cid: string;
  name: string;
  cycle: string;
  status: boolean;
  pics?: VotePic[];  // make optional since it might be missing
}


export interface VoteWithCandidate {
  vid: string;
  candident: string;
  cvote?: VoteCandidate;
}
