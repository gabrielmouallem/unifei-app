import { Primitive } from "../../types";
import { isPrimitive } from "util";

import { CascadeModel, CheckableValues } from "./types";
import { existPrimitive } from "./primitive";
import { existCascade, isCascadeModel } from "./cascade";

const checkExists = (buffer: CheckableValues | Array<CheckableValues>) => {
  if (isPrimitive(buffer)) {
    return existPrimitive(buffer as Primitive);
  }

  if (isCascadeModel(buffer)) {
    return existCascade(buffer as CascadeModel);
  }

  if (Array.isArray(buffer)) {
    let exist = true;

    buffer.every((item: any) => {
      if (isPrimitive(item)) {
        exist = existPrimitive(item as Primitive);
      } else if (isCascadeModel(item)) {
        exist = existCascade(item as CascadeModel);
      }

      return exist;
    });

    return exist;
  }
};

export default checkExists;
