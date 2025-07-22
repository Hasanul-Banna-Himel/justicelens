import { ProfileData } from "@/interfaces";

export type ContextState = {
  loggedInStatus: boolean;
  profileData: ProfileData | null;
  lastUpdated: Date;
};

export const initialState: ContextState = {
  loggedInStatus: false,
  profileData: null,
  lastUpdated: new Date(),
};

type Action =
  | { type: "login"; payload: boolean }
  | { type: "profileData"; payload: ProfileData | null }
  | { type: "lastUpdated"; payload: Date };

const reducer = (state: ContextState, action: Action): ContextState => {
  const { type, payload } = action;
  switch (type) {
    case "login":
      return { ...state, loggedInStatus: payload };
    case "profileData":
      return { ...state, profileData: payload };
    case "lastUpdated":
      return { ...state, lastUpdated: payload };
    default:
      return state;
  }
};

export default reducer;
