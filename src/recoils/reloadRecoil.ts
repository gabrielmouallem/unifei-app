import { atom, selector } from "recoil";

//Recoils

export interface ReloadState {
    reload: boolean;
}

export const reloadAtom = atom<ReloadState>({
    key: "reload",
    default: {
        reload: false,
    }
});
