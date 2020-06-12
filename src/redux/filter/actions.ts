import { action } from "typesafe-actions";
import { FilterRedux, FilterTypes } from "./types";
import { Action } from "redux";

export interface StoreFilter extends Action {
    type: FilterTypes.STORE_FILTER;
    payload: FilterRedux;
}

export const storeFilter = (filter: FilterRedux): StoreFilter =>
    action(FilterTypes.STORE_FILTER, filter);

export type FilterActions = StoreFilter;
