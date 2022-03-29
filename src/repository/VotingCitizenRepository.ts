import { AppDataSource } from '../data-source';
import { VotingCitizen } from '../entity/VotingCitizen';
import { auth } from '../service/Auth';
import IObject from '../interfaces/IObject';

export const votingCitizenRepository = AppDataSource.getRepository(VotingCitizen).extend({
  async createHashed(data: IObject): Promise<VotingCitizen> {
    data.refreshToken = auth.getRefreshToken(
      {
        id: data.citizen.id,
        firstname: data.citizen.firstname,
        lastname: data.citizen.lastname
      }
    );
    data.password = await auth.getHash(data.password);

    return this.create(data);
  }
});