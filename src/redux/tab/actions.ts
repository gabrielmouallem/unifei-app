import { action } from "typesafe-actions";
import { TabRedux, TabTypes } from "./types";
import { Action } from "redux";

export interface SelectTab extends Action {
    type: TabTypes.SELECT_TAB;
    payload: TabRedux;
}

export const selectTab = (tab: TabRedux): SelectTab =>
    action(TabTypes.SELECT_TAB, tab);

export type TabActions = SelectTab;
