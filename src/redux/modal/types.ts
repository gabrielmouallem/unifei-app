import { ReactJSX } from "../../utils/types";

export enum ModalTypes {
    HANDLE_MODAL = "@@modal/HANDLE_MODAL"
}

export interface ModalRedux {
    open: any;
}

export interface ModalState {
    data: ModalRedux;
}