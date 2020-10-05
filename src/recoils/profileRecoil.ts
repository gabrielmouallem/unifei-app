import { atom, selector } from "recoil";

//Recoils

export interface ProfileState {
    name: string,
    email: string,
    course: number,
    user_permissions: number,
    code: string,
}

export const profileAtom = atom<ProfileState>({
    key: "profile",
    default: {
        name: '',
        email: '',
        course: -1,
        user_permissions: -1,
        code: '',
    }
});
