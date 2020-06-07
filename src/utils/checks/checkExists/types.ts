import { Primitive } from '../../types';

export type CascadeModel = [
  string,
  {
    [fields: string]: any;
  },
  '__cascade'
];

export type CheckableValues = Primitive | CascadeModel;
