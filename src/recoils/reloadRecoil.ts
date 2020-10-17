import { atom, selector } from "recoil";

//Recoils

export interface ReloadState {
    reload: boolean;
    stateChange: any;
}

export const reloadAtom = atom<ReloadState>({
    key: "reload",
    default: {
        reload: false,
        stateChange: -1
    }
});
