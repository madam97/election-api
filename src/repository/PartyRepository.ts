import { AppDataSource } from '../data-source';
import { Party } from '../entity/Party';

export const partyRepository = AppDataSource.getRepository(Party);