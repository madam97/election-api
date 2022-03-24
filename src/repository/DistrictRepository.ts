import { AppDataSource } from '../data-source';
import { District } from '../entity/District';

export const districtRepository = AppDataSource.getRepository(District);