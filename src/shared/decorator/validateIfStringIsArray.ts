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
            const list: string[] = Array.isArray(values)
              ? values
              : JSON.parse(values);
            if (!Array.isArray(list)) {
              return false;
            }
            const isAllStrings = list.every((item) => typeof item === 'string');
            if (!isAllStrings) {
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
