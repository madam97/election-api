import { Controller } from './Controller';
import { Candidate } from '../entity/Candidate';
import { VotingCitizen } from '../entity/VotingCitizen';
import { candidateRepository } from '../repository/CandidateRepository';
import { citizenRepository } from '../repository/CitizenRepository';

class VoteController extends Controller {
  constructor() {
    super();

    this.setRoutes([
      {
        method: 'GET',
        path: '/candidates',
        role: 'voting-citizen',
        func: this.getCandidates.bind(this)
      }
    ]);
  }

  private async getCandidates(user: VotingCitizen): Promise<Candidate[]> {
    return await candidateRepository.findByDistrict(user.district);
  }
}

export const voteController = new VoteController();