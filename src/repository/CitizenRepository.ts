import { AppDataSource } from '../data-source';
import { Citizen } from '../entity/Citizen';
import { random, randomChar } from '../functions';

export const citizenRepository = AppDataSource.getRepository(Citizen).extend({
  getIdentityNumber(): string {
    return randomChar(2) + String( random(1, 999999) ).padStart(6, '0');
  }
})