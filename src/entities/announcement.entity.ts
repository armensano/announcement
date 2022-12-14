import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'simple-array', default: [] })
  images: string[];

  @Column({ type: 'simple-array', default: [] })
  tags: string[];

  @Column()
  price: number;

  @Column()
  region: string;

  @Column()
  categoryId: number;
  @ManyToOne(() => Category, (category) => category.announcement)
  category: Category;

  @Column()
  city: string;

  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.announcements)
  user: number;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
