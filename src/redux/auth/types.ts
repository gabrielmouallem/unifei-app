export enum AuthTypes {
  SET_TOKEN = '@@auth/SET_TOKEN',
  CLEAR_TOKEN = '@@auth/CLEAR_TOKEN'
}

export interface AuthState {
  token: string;
  logged_in: boolean;
}
