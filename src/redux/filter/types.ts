import { ReactJSX } from "../../utils/types";

export enum FilterTypes {
    STORE_FILTER = "@@filter/STORE_FILTER"
}

export interface FilterRedux {
    type: any;
}

export interface FilterState {
    data: FilterRedux;
}