import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
  isNotEmpty,
} from 'class-validator';

@ValidatorConstraint({ name: 'stringOrNull', async: false })
export class StringOrNullValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (value === null) {
      return true;
    }

    return typeof value === 'string' && isNotEmpty(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a non-empty string or null.`;
  }
}

export function IsStringOrNull(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: StringOrNullValidator,
    });
  };
}
