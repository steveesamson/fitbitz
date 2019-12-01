import { useState } from "react";
import { Errors } from "../types/common";
const emailRe = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}$/gi;

//Dirty validator
const useValidator = (data: any) => {
  const [errors, setErrors] = useState<Errors>({}),
    validate = (names: string[]): boolean => {
      const inValids = names.filter((n: string) => !data[n]);
      if (inValids.length) {
        inValids.forEach((f: string) => checkError("", f));
        return false;
      }
      return true;
    },
    addError = (error: string, field: string): void => {
      setErrors((pre: Errors) => {
        return { ...pre, [field]: error };
      });
    },
    checkError = (val: string, field: string): void => {
      setErrors((pre: Errors) => {
        if (val) {
          delete pre[field];
        } else {
          pre = { ...pre, [field]: val ? "" : `${field} is required` };
        }
        return pre;
      });
    };

  return { checkError, validate, addError, errors };
};
const toDate = (str: any) => new Date(str);
export { useValidator, emailRe, toDate };
