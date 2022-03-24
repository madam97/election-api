import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dbConfig } from './config';

export const AppDataSource = new DataSource({
  type          : 'mysql',
  host          : dbConfig.host,
  port          : dbConfig.port,
  username      : dbConfig.username,
  password      : dbConfig.password,
  database      : dbConfig.database,
  synchronize   : true,
  logging       : true,
  entities      : [],
  subscribers   : [],
  migrations    : [],
});