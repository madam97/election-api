import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dbConfig } from './config';
import { Candidate } from './entity/Candidate';
import { District } from './entity/District';
import { Party } from './entity/Party';
import { Citizen } from './entity/Citizen';
import { VotingCitizen } from './entity/VotingCitizen';
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
  entities      : [Candidate, District, Party, Citizen, VotingCitizen, Vote],
  subscribers   : [],
  migrations    : [],
});