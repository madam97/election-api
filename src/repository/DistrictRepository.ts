import { AppDataSource } from '../data-source';
import { District } from '../entity/District';

export const districtRepository = AppDataSource.getRepository(District).extend({
  getRandom(): Promise<District | null> {
    return this.createQueryBuilder('district')
      .orderBy('RAND()')
      .getOne();
  }
});