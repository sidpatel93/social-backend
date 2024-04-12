import { JoiValidationError } from "../helpers/errorHandler";
import { Request } from "express";
import { ObjectSchema } from "joi";

type IJoiDecorator = (
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) => void;

export function JoiValidation(schema: ObjectSchema): IJoiDecorator {
  return (_target, _key, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const req = args[0] as Request;
      const { error } = await Promise.resolve(schema.validate(req.body));
      if (error?.details) {
        throw new JoiValidationError(error.details[0].message);
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
