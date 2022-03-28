import { AppDataSource } from '../data-source';
import { VotingCitizen } from '../entity/VotingCitizen';

export const votingCitizenRepository = AppDataSource.getRepository(VotingCitizen);