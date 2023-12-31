import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { validate, version } from 'uuid';

@ValidatorConstraint({ name: 'stringOrNull', async: false })
export class StringOrNullValidator implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    if (value === null) {
      return true;
    }
    return typeof value === 'string' && validate(value) && version(value) === 4;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid UUIDv4 or null.`;
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
