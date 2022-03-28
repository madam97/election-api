import { Controller } from './Controller';
import { partyRepository } from '../repository/PartyRepository';
import IObject from '../interfaces/IObject';

class PartyController extends Controller {
  constructor() {
    super();

    this.setRoutes([
      {
        method: 'GET',
        path: '/',
        func: this.get.bind(this)
      },
      {
        method: 'GET',
        path: '/:id',
        func: this.getOne.bind(this)
      },
      {
        method: 'POST',
        path: '/',
        func: this.post.bind(this)
      },
      {
        method: 'PUT',
        path: '/:id',
        func: this.put.bind(this)
      },
      {
        method: 'DELETE',
        path: '/:id',
        func: this.delete.bind(this)
      }
    ]);
  }

  private async get() {
    return await partyRepository.find();
  }

  private async getOne(id: number) {
    const party = await partyRepository.findOneBy({ id });

    if (!party) {
      throw new Error(`was not able to find Party with ${id} id`);
    }

    return party;
  }

  private async post(body: IObject) {
    delete body.id;

    const party = partyRepository.create(body);

    return await partyRepository.save(party);
  }

  private async put(id: number, body: object) {
    await partyRepository.update(id, { ...body, id });

    return await this.getOne(id);
  }

  private async delete(id: number) {
    const party = await this.getOne(id);

    await partyRepository.delete(id);

    return party;
  }
}

export const partyController = new PartyController();