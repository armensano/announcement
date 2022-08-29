import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from 'src/entities/announcement.entity';
import { Repository } from 'typeorm';
import { SearchAnnouncementDto } from './dto/search-announcement.dto';
import { IAnnouncement } from './interface/announcement.interface';
import { ReturnAnnouncement } from './interface/return-announcement.interface';
import { IUpdateAnnouncement } from './interface/update-announcement.interface';

@Injectable()
export class AnnouncementsService {
  @InjectRepository(Announcement)
  private readonly announcementRepository: Repository<Announcement>;

  async create(
    userId: number,
    createAnnouncementDto: IAnnouncement,
  ): Promise<ReturnAnnouncement> {
    return await this.announcementRepository.save({
      ...createAnnouncementDto,
      userId,
    });
  }

  async findAll(
    userId: number,
    onlyMine: boolean,
  ): Promise<ReturnAnnouncement[]> {
    return await this.announcementRepository.find({
      where: onlyMine ? { userId } : {},
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ReturnAnnouncement> {
    return await this.announcementRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateAnnouncementDto: IUpdateAnnouncement,
  ): Promise<ReturnAnnouncement> {
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

  async remove(id: number): Promise<ReturnAnnouncement> {
    const announcement = await this.announcementRepository.findOneBy({ id });
    if (announcement) {
      await this.announcementRepository.delete(id);
      return announcement;
    } else {
      throw new NotFoundException('Announcement not found');
    }
  }

  async searchAnnouncements(
    searchAnnouncementsDto: SearchAnnouncementDto,
  ): Promise<ReturnAnnouncement[]> {
    const { limit, page, description, tags, city, region, price, category } =
      searchAnnouncementsDto;
    const offset = (page - 1) * limit;

    return await this.announcementRepository
      .createQueryBuilder('announcement')
      .where(description ? 'description ILIKE :description' : '1=1', {
        description: `%${description}%`,
      })
      .andWhere(tags ? 'tags ILIKE :tags' : '1=1', {
        tags: `%${tags}%`,
      })
      .andWhere(city ? 'city ILIKE :city' : '1=1', {
        city: `%${city}%`,
      })
      .andWhere(region ? 'region ILIKE :region' : '1=1', {
        region: `%${region}%`,
      })
      .andWhere(price ? 'price <= :price' : '1=1', {
        price,
      })
      .andWhere(category ? 'category = :category' : '1=1', {
        category,
      })
      .orderBy('created_at', 'DESC')
      .limit(limit)
      .offset(offset)
      .getMany();
  }
}
