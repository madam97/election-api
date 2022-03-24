import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dbConfig } from './config';
import { Candidate } from './entity/Candidate';
import { District } from './entity/District';
import { Party } from './entity/Party';
import { User } from './entity/User';
import { Vote } from './entity/Vote';

export const AppDataSource = new DataSource({
  type          : 'mysql',
  host          : dbConfig.host,
  port          : dbConfig.port,
  username      : dbConfig.username,
  password      : dbConfig.password,
  database      : dbConfig.database,
  synchronize   : true,
  logging       : true,
  entities      : [User, Candidate, District, Party, Vote],
  subscribers   : [],
  migrations    : [],
});