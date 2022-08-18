import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
console.log(
  'process.env.POSTGRES_HOST',
  configService.get<string>('POSTGRES_HOST'),
);

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['src/entities/**.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
});
