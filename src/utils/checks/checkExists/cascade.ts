import { CascadeModel } from "./types";
import { existPrimitive } from "./primitive";
import { isArray } from "util";

interface FieldProp {
  type: string;
  name: string;
  index?: string;
}

export const existCascade = (cascade: CascadeModel): boolean => {
  const utils = new CascadeUtils();

  const fields = cascade[0];

  const fieldsProp = fields.split(".").map(
    (field: string): FieldProp => {
      if (utils.isArray(field)) {
        return utils.arrayField(field) as FieldProp;
      }

      return utils.normalField(field) as FieldProp;
    }
  );

  let aux = { ...cascade[1] };
  let exist = true;

  fieldsProp.every((field: FieldProp) => {
    const { type, name, index } = field;

    if (!utils.nextExists(aux, name, index)) exist = false;

    switch (type) {
      case "array":
        aux = aux[name][index || -1];
        break;

      case "normal":
        aux = aux[name];
        break;

      default:
        break;
    }

    return exist;
  });

  return exist;
};

class CascadeUtils {
  normalField(field: string): FieldProp {
    return {
      name: field,
      type: "normal"
    };
  }

  arrayField(field: string): FieldProp {
    return {
      name: field.split("[")[0],
      index: field.split("[")[1].split("]")[0],
      type: "array"
    };
  }

  isArray(field: string): boolean {
    return field.includes("[") && field.includes("]");
  }

  nextExists(object: { [fields: string]: any }, name: string, index?: string) {
    if (!existPrimitive(object[name])) return false;

    // array case
    if (existPrimitive(index) && !existPrimitive(object[name][index || -1]))
      return false;

    return true;
  }
}

export function isCascadeModel(value: any): boolean {
  return (
    isArray(value) &&
    typeof value[0] === "string" &&
    typeof value[1] === "object" &&
    value[2] === "__cascade"
  );
}
