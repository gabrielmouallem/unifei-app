import { action } from "typesafe-actions";
import { ProfileRedux, ProfileTypes } from "./types";
import { Action } from "redux";

export interface SetProfile extends Action {
    type: ProfileTypes.SET_PROFILE;
    payload: ProfileRedux;
}

export const setProfile = (profile: ProfileRedux): SetProfile =>
    action(ProfileTypes.SET_PROFILE, profile);

export type ProfileActions = SetProfile;
