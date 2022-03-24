import { AppDataSource } from '../data-source';
import { Candidate } from '../entity/Candidate';

export const candidateRepository = AppDataSource.getRepository(Candidate);