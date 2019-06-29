import { UserProfile } from "../types";
import { State } from "../reducers";

export function selectUserProfile(state: State): UserProfile | undefined {
  return state.userProfile.userProfile;
}
