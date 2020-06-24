import { ReactJSX } from "../../utils/types";

export enum ProfileTypes {
    SET_PROFILE = "@@profile/SET_PROFILE"
}

export interface ProfileRedux {
    name: string,
    email: string,
    course: number,
    user_permissions: number,
    code: string,
}

export interface ProfileState {
    data: ProfileRedux;
}