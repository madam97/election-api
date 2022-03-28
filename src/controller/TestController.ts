import axios from 'axios';
import moment from 'moment';
import { Controller } from './Controller';
import { citizenRepository } from '../repository/CitizenRepository';
import { districtRepository } from '../repository/DistrictRepository';
import IObject from '../interfaces/IObject';

class TestController extends Controller {
  constructor() {
    super();

    this.setRoutes([
      {
        method: 'GET',
        path: '/citizen',
        func: this.getCitizens.bind(this)
      },
      {
        method: 'POST',
        path: '/citizen/generate',
        func: this.postCitizenGenerate.bind(this)
      }
    ]);
  }

  private async getCitizens() {
    return await citizenRepository.find();
  }

  private async postCitizenGenerate(body: IObject) {
    // Get random vote district
    const district = await districtRepository.getRandom();
    if (!district) {
      throw new Error('there are no vote districts');
    }

    // Generate citizen's data
    if (!body.firstname || !body.lastname || !body.birthDate) {
      const res = await axios.get('https://randomuser.me/api/?results=1&inc=name,dob&nat=us,gb');
      const user = await res.data.results[0] as IObject;

      body.firstname = body.firstname ?? user.name.first;
      body.lastname = body.lastname ?? user.name.last;
      body.birthDate = body.birthDate ?? user.dob.date;
    }

    delete body.id;
    body.birthDate = moment(body.birthDate).format('YYYY-MM-DD');

    // Save data
    const citizen = citizenRepository.create(body);
    citizen.identityNumber = citizenRepository.getIdentityNumber();
    citizen.district = district;

    return await citizenRepository.save(citizen);
  }
}

export const testController = new TestController();