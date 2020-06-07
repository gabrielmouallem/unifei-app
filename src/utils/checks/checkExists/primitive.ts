import { Primitive } from '../../types';

export const existPrimitive = (value: Primitive) => value !== undefined && value !== null;
