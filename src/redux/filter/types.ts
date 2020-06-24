import { ReactJSX } from "../../utils/types";

export enum FilterTypes {
    STORE_FILTER = "@@filter/STORE_FILTER"
}

export interface FilterRedux {
    genericMarkers: boolean,
    eventMarkers: boolean,
    studyGroupMarkers: boolean,
    extraActivityMarkers: boolean,
    constructionMarkers: boolean,
    scheduleMarkers: boolean
}

export interface FilterState {
    data: FilterRedux;
}