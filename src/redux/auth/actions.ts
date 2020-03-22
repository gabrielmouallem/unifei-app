import { action } from 'typesafe-actions';
import { AuthTypes } from './types';
import { Action } from 'redux';

export interface SetToken extends Action {
  type: AuthTypes.SET_TOKEN;
  payload: {
    token: string;
  };
}

export interface ClearToken extends Action {
  type: AuthTypes.CLEAR_TOKEN;
  payload: {}
}

export const setToken = (token: string): SetToken => action(AuthTypes.SET_TOKEN, { token });

export const clearToken = (): ClearToken => action(AuthTypes.CLEAR_TOKEN, {});

export type AuthActions = SetToken;
