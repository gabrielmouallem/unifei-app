import { atom, selector } from "recoil";
import { MarkerProps } from "../models/markers";

//Recoils

export const markersAtom = atom<MarkerProps[]>({
    key: "markers",
    default: []
});
