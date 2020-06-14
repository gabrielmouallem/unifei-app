import { ReactJSX } from "../../utils/types";

export enum TabTypes {
    SELECT_TAB = "@@tab/SELECT_TAB"
}

export interface TabRedux {
    value: any
}

export interface TabState {
    data: TabRedux;
}