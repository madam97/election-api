import { AppDataSource } from '../data-source';
import { Candidate } from '../entity/Candidate';
import { District } from '../entity/District';

export const candidateRepository = AppDataSource.getRepository(Candidate).extend({
  async findByDistrict(district: District): Promise<Candidate[]> {
    return this.createQueryBuilder('candidate')
      .innerJoinAndSelect('candidate.party', 'party')
      .innerJoinAndSelect('candidate.district', 'district')
      .where('district.id = :districtId', { districtId: district.id })
      .getMany()
  }
});