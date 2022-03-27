import { Controller } from './Controller';
import { districtRepository } from '../repository/DistrictRepository';
import IObject from '../interfaces/IObject';

class DistrictController extends Controller {
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
    return await districtRepository.find();
  }

  private async getOne(id: number) {
    const district = await districtRepository.findOneBy({ id });

    if (!district) {
      throw new Error(`was not able to find District with ${id} id`);
    }

    return district;
  }

  private async post(body: IObject) {
    body.id = null;

    const district = districtRepository.create(body);

    return await districtRepository.save(district);
  }

  private async put(id: number, body: object) {
    await districtRepository.update(id, { ...body, id });

    return await this.getOne(id);
  }

  private async delete(id: number) {
    const district = await this.getOne(id);

    await districtRepository.delete(id);

    return district;
  }
}

export const districtController = new DistrictController();