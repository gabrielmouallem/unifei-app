import { atom, selector } from "recoil";

//Recoils

export interface FilterState {
    genericMarkers: boolean,
    eventMarkers: boolean,
    studyGroupMarkers: boolean,
    extraActivityMarkers: boolean,
    constructionMarkers: boolean,
    scheduleMarkers: boolean
}

export const filterAtom = atom<FilterState>({
    key: "filter",
    default: {
        genericMarkers: false,
        eventMarkers: false,
        studyGroupMarkers: false,
        extraActivityMarkers: false,
        constructionMarkers: false,
        scheduleMarkers: false
    }
});
