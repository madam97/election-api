import { Controller } from './Controller';
import { citizenRepository } from '../repository/CitizenRepository';
import { votingCitizenRepository } from '../repository/VotingCitizenRepository';
import IObject from '../interfaces/IObject';
import { VotingCitizen } from '../entity/VotingCitizen';
import { auth } from '../service/Auth';
import { Citizen } from '../entity/Citizen';

class AuthController extends Controller {
  constructor() {
    super();

    this.setRoutes([
      {
        method: 'POST',
        path: '/citizen-validate',
        func: this.postCitizenValidate.bind(this)
      },
      {
        method: 'POST',
        path: '/register',
        func: this.postRegister.bind(this)
      },
      {
        method: 'POST',
        path: '/login',
        func: this.postLogin.bind(this)
      }
    ]);
  }

  private async postCitizenValidate(body: IObject): Promise<Citizen> {
    const citizen = citizenRepository.create(body);

    await this.validate(citizen);

    const savedCitizen = await citizenRepository.findOne({
      where: {
        identityNumber: citizen.identityNumber,
        firstname: citizen.firstname,
        lastname: citizen.lastname,
        birthDate: citizen.birthDate
      },
      relations: ['district', 'votingCitizen']
    });

    if (!savedCitizen) {
      throw new Error('citizen was not found in the database');
    } else if (savedCitizen.votingCitizen) {
      throw new Error('citizen has already registered to vote');
    }

    return savedCitizen;
  }

  private async postRegister(body: IObject): Promise<VotingCitizen> {
    body.citizen = await this.postCitizenValidate(body);
    body.district = body.citizen.district;

    const votingCitizen = await votingCitizenRepository.createHashed(body);

    await this.validate(votingCitizen);

    await votingCitizenRepository.save(votingCitizen);

    return votingCitizen;
  }

  private async postLogin(body: IObject): Promise<object> {
    if (!body.email && !body.password) {
      throw new Error('email or password is missing');
    }

    // Validate email and password
    const votingCitizen = await votingCitizenRepository.findOne({
      where: { email: body.email },
      relations: ['citizen']
    });

    if (!votingCitizen || !await auth.verifyPassword(body.password, votingCitizen.password)) {
      throw new Error('given email or password is invalid');
    }

    // Last login update
    votingCitizen.lastLogin = new Date();
    await votingCitizenRepository.update(votingCitizen.id, votingCitizen);

    // Return access token
    const name = votingCitizen.citizen.firstname + ' ' + votingCitizen.citizen.lastname;

    return {
      name,
      token: auth.getToken({
        id: votingCitizen.id,
        name,
        role: 'voting-citizen'
      })
    }
  }
}

export const authController = new AuthController();