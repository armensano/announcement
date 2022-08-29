import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchAnnouncementDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 1,
  })
  limit: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    example: 10,
  })
  page: number;

  @ApiProperty({
    type: String,
    description: 'description search query',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    type: String,
    description: 'tags search query',
  })
  @IsOptional()
  @IsString()
  tags: string;

  @ApiProperty({
    type: String,
    description: 'city search query',
  })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({
    type: String,
    description: 'region search query',
  })
  @IsOptional()
  @IsString()
  region: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    example: 10,
  })
  price: number;
}
