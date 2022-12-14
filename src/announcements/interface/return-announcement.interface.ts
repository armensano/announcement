import { IAnnouncement } from './announcement.interface';

export class ReturnAnnouncement extends IAnnouncement {
  id: number;
  userId: number;
  created_at: Date;
  updated_at: Date;
}
