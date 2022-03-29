import express from 'express';
import { appConfig } from './config';
import { AppDataSource } from './data-source';
import { testController } from './controller/TestController';
import { authController } from './controller/AuthController';
import { voteController } from './controller/VoteController';
import { districtController } from './controller/DistrictController';
import { partyController } from './controller/PartyController';
import { candidateController } from './controller/CandidateController';

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    // Init middleware
    app.use(express.json());

    // Routes
    app.use('/api/test', testController.router);
    app.use('/api/auth', authController.router);
    app.use('/api/vote', voteController.router);
    // app.use('/api/district', districtController.router);
    // app.use('/api/party', partyController.router);
    // app.use('/api/candidate', candidateController.router);

    app.listen(appConfig.port, () => console.log(`Server started on port ${appConfig.port}`));

    console.log('Working');
  })
  .catch(err => console.log('Error: ', err));