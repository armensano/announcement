import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement } from 'src/entities/announcement.entity';

@Module({
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
  imports: [TypeOrmModule.forFeature([Announcement])],
})
export class AnnouncementsModule {}
