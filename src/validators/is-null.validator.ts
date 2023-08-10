import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
  isNotEmpty,
} from 'class-validator';
import { v4 as uuidv4, validate, version } from 'uuid';

@ValidatorConstraint({ name: 'stringOrNull', async: false })
export class StringOrNullValidator implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    if (value === null) {
      return true;
    }
    return typeof value === 'string' && validate(value) && version(value) === 4;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a non-empty string or a valid UUIDv4 or null.`;
  }
}

export function IsStringOrNull(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: StringOrNullValidator,
    });
  };
}
