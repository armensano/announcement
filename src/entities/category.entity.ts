import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Announcement } from './announcement.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @OneToMany(() => Announcement, (announcement) => announcement.category)
  announcement: Announcement;
}
