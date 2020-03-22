import React from "react";

/**
 * Generics
 */

export type Primitive =
  | string
  | boolean
  | number
  | bigint
  | symbol
  | null
  | undefined
  | any;

export type ReactJSX = JSX.Element[] | JSX.Element;

export interface ChildrenProps {
  children: ReactJSX;
}

export const NoneReactJSX = (): ReactJSX => {
  return React.createElement(React.Fragment);
};

export interface GenericObject {
  [key: string]: any;
}

/**
 *  Arrays
 */

export const arrUpdateOrInsert = <M>(
  array: M[],
  payload: M,
  keyCompare: string
): M[] => {
  const newList = array.slice();

  var index = newList.findIndex(
    item =>
      (item as GenericObject)[keyCompare] ===
      (payload as GenericObject)[keyCompare]
  );

  if (index !== -1) {
    newList[index] = payload;
  } else {
    newList.push(payload);
  }

  return newList;
};

export const arrReverse = (arr: any[]) => {
  let value = [...arr];
  value.reverse();
  return value;
};

export const arrRemoveIndex = (arr: any[], index: number) => {
  const newArr = [...arr];
  newArr.splice(index, 1);
  return newArr;
};

export const arrAreEqualLength = (arr: any[][]): boolean => {
  const length = arr[0].length;
  let equal = true;

  arr.forEach(__array => {
    if (__array.length !== length) equal = false;
  });

  return equal;
};

export const arrCompare = (a: any[], b: any[]) => {
  // if length is not equal
  if (a.length !== b.length) return false;
  else {
    // comapring each element of array
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }
};