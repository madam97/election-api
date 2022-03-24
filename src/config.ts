import dotenv from 'dotenv';
dotenv.config({ path: `.env${process.env.NODE_ENV ? '.'+process.env.NODE_ENV : ''}` });

interface IAppConfig {
  port            : number
};

interface IDbConfig {
  host            : string,
  port            : number,
  username        : string,
  password        : string,
  database        : string,
  tablePrefix     : string
};

interface IAuthConfig {
  secret            : string,
  refreshSecret     : string,
  bcryptSaltRounds  : number
};

export const appConfig: IAppConfig = {
  port            : process.env.PORT ? parseInt(process.env.PORT) : 5000
};

export const dbConfig: IDbConfig = {
  host          : process.env.DB_HOST ?? 'localhost',
  port          : process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username      : process.env.DB_USERNAME ?? '',
  password      : process.env.DB_PASSWORD ?? '',
  database      : process.env.DB_DATABASE ?? '',
  tablePrefix   : process.env.DB_TABLE_PREFIX ?? ''
  // connectionLimit : process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT) : 10
};

export const authConfig: IAuthConfig = {
  secret            : process.env.AUTH_SECRET ?? 'secretkey', 
  refreshSecret     : process.env.AUTH_REFRESH_SECRET ?? 'refreshtokensecretkey',
  bcryptSaltRounds  : process.env.AUTH_BCRYPT_SALT_ROUNDS ? parseInt(process.env.AUTH_BCRYPT_SALT_ROUNDS) : 10
};