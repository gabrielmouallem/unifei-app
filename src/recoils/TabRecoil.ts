import { atom, selector } from "recoil";

//Recoils

export interface TabState {
    value: any
}

export const tabAtom = atom<TabState>({
    key: "selected-tab",
    default: {
        value: 0,
    },
});
