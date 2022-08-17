import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from 'src/entities/announcement.entity';
import { Repository } from 'typeorm';
import { ICreateAnnouncement } from './interface/create-announcement.interface';
import { IUpdateAnnouncement } from './interface/update-announcement.interface';

@Injectable()
export class AnnouncementsService {
  @InjectRepository(Announcement)
  private readonly announcementRepository: Repository<Announcement>;
  async create(userId: number, createAnnouncementDto: ICreateAnnouncement) {
    const result = await this.announcementRepository.save({
      ...createAnnouncementDto,
      userId,
    });
    return result;
  }

  async findAll(userId: number) {
    return await this.announcementRepository.find({
      order: { created_at: 'DESC' },
      where: { userId },
    });
  }

  async findOne(id: number) {
    return await this.announcementRepository.findOneBy({ id });
  }

  async update(id: number, updateAnnouncementDto: IUpdateAnnouncement) {
    const announcement = await this.announcementRepository.findOneBy({ id });
    if (announcement) {
      return await this.announcementRepository.save({
        ...announcement,
        ...updateAnnouncementDto,
      });
    } else {
      throw new NotFoundException('Announcement not found');
    }
  }

  async remove(id: number) {
    const announcement = await this.announcementRepository.findOneBy({ id });
    if (announcement) {
      await this.announcementRepository.delete(id);
      return announcement;
    } else {
      throw new NotFoundException('Announcement not found');
    }
  }
}
