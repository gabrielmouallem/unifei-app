import { atom, selector } from "recoil";

//Recoils

export interface MapCenterState {
    lat: number,
    lng: number,
}

export const mapCenterAtom = atom<MapCenterState>({
    key: "map-center",
    default: {
        lat: -22.413042,
        lng: -45.449687
    }
});
