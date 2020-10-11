import { atom, selector } from "recoil";

//Recoils

export interface MapPropsState {
    center: {
        lat: number,
        lng: number
    },
    zoom: number
}

export const mapPropsAtom = atom<MapPropsState>({
    key: "map-props",
    default: {
        center: {
            lat: -22.413042,
            lng: -45.449687
        },
        zoom: 18
    }
});
