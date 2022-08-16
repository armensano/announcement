import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsArray(
  property: string,
  validationOptions: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(values: string, options: ValidationArguments) {
          try {
            const list: string[] = JSON.parse(values);
            if (!Array.isArray(list)) {
              return false;
            }
            const isAllNumbers = list.every((item) => typeof item === 'string');
            if (!isAllNumbers) {
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
