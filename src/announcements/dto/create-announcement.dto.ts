import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsArray } from '../../shared/decorator/validateIfStringIsArray';
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
  @IsNotEmpty()
  region: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber('announcement', {
    message: 'categoryId must be a number',
  })
  categoryId: number;
}
