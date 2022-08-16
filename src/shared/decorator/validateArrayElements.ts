import { BadRequestException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsBetween(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsBetween',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(values: number[], options: ValidationArguments) {
          if (
            options.value === undefined ||
            Array.isArray(options.value) === false ||
            options.value.length === 0
          ) {
            throw new BadRequestException(
              'Shelf ids must be numbers between 1 and 5',
            );
          }

          const invalidInput = values.find((value) => value > 5 || value < 1);
          if (invalidInput) return false;
          return true;
        },
      },
    });
  };
}
