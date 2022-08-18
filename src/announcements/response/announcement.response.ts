import { ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToClass } from 'class-transformer';
import { IAnnouncement } from '../interface/create-announcement.interface';

export class CreateAnnouncementResponse {
  @ApiProperty()
  description: string;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  price: number;

  @ApiProperty()
  region: string;

  @ApiProperty()
  city: string;

  @Exclude()
  userId: number;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  static from(announcement: IAnnouncement): CreateAnnouncementResponse;

  static from(announcement: IAnnouncement[]): CreateAnnouncementResponse[];

  static from(
    announcement: IAnnouncement | IAnnouncement[],
  ): CreateAnnouncementResponse | CreateAnnouncementResponse[] {
    return plainToClass(CreateAnnouncementResponse, announcement);
  }
}
