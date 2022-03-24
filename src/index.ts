import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async () => {
    console.log('Working');
  })
  .catch(err => console.log('Error: ', err));