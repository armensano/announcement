import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsNumber(
  property: string,
  validationOptions: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(values: string, options: ValidationArguments) {
          try {
            const number = Number(values);
            if (isNaN(number)) {
              return false;
            }
            return true;
          } catch (err) {
            return false;
          }
        },
      },
    });
  };
}
