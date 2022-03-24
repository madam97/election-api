import { AppDataSource } from '../data-source';
import { Vote } from '../entity/Vote';

export const voteRepository = AppDataSource.getRepository(Vote);