import { Controller } from './Controller';
import { candidateRepository } from '../repository/CandidateRepository';
import IObject from '../interfaces/IObject';

class CandidateController extends Controller {
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
    return await candidateRepository.find();
  }

  private async getOne(id: number) {
    const candidate = await candidateRepository.findOneBy({ id });

    if (!candidate) {
      throw new Error(`was not able to find Candidate with ${id} id`);
    }

    return candidate;
  }

  private async post(body: IObject) {
    delete body.id;

    const candidate = candidateRepository.create(body);

    return await candidateRepository.save(candidate);
  }

  private async put(id: number, body: IObject) {
    await candidateRepository.update(id, { ...body, id });

    return await this.getOne(id);
  }

  private async delete(id: number) {
    const candidate = await this.getOne(id);

    await candidateRepository.delete(id);

    return candidate;
  }
}

export const candidateController = new CandidateController();