import { ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToClass, Transform } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { IAnnouncement } from '../interface/announcement.interface';

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

  @Transform(({ value }) => value.name)
  user: User;

  static from(announcement: IAnnouncement): CreateAnnouncementResponse;

  static from(announcement: IAnnouncement[]): CreateAnnouncementResponse[];

  static from(
    announcement: IAnnouncement | IAnnouncement[],
  ): CreateAnnouncementResponse | CreateAnnouncementResponse[] {
    return plainToClass(CreateAnnouncementResponse, announcement);
  }
}
