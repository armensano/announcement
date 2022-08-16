import {
  ValidationOptions,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';

export function IsBoolean(
  property: string,
  validationOptions: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isBoolean',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(values: string, options: ValidationArguments) {
          if (values === 'true' || values === 'false') {
            return true;
          } else {
            return false;
          }
        },
      },
    });
  };
}
