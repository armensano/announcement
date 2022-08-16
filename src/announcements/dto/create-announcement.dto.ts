import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { IsArray } from '../../shared/decorator/validateIfStringIsArray';
import { IsBoolean } from '../../shared/decorator/validateIfStringIsBoolean';
import { IsNumber } from '../../shared/decorator/validateIfStringIsNumber';

export class CreateAnnouncementDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  images: string[];

  @IsString()
  @ApiProperty()
  description: string;

  @IsArray('announcement', {
    message: 'tags must be an array of strings',
  })
  @ApiProperty()
  tags: string;

  @ApiProperty()
  @IsNumber('announcement', {
    message: 'price must be a number',
  })
  price: number;

  @ApiProperty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsString()
  city: string;
}
