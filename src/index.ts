import express from 'express';
import { appConfig } from './config';
import { AppDataSource } from './data-source';
import { districtController } from './controller/DistrictController';
import { partyController } from './controller/PartyController';
import { candidateController } from './controller/CandidateController';

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    // Init middleware
    app.use(express.json());

    // Routes
    app.use('/api/district', districtController.router);
    app.use('/api/party', partyController.router);
    app.use('/api/candidate', candidateController.router);

    app.listen(appConfig.port, () => console.log(`Server started on port ${appConfig.port}`));

    console.log('Working');
  })
  .catch(err => console.log('Error: ', err));