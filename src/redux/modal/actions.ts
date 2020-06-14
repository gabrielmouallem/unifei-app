import { action } from "typesafe-actions";
import { ModalRedux, ModalTypes } from "./types";
import { Action } from "redux";

export interface HandleModal extends Action {
    type: ModalTypes.HANDLE_MODAL;
    payload: ModalRedux;
}

export const handleModal = (modal: ModalRedux): HandleModal =>
    action(ModalTypes.HANDLE_MODAL, modal);

export type ModalActions = HandleModal;
