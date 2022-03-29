import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authConfig } from '../config';
import IObject from '../interfaces/IObject';

export type TAuthRole = 'guest' | 'voting-citizen' | 'admin';

export interface AuthUser {
  id: number,
  name: string,
  role?: TAuthRole
};

export interface TokenPayload {
  user: AuthUser
};

export interface AuthCitizen {
  id: number,
  firstname: string,
  lastname: string
}

export interface RefreshTokenPayload {
  user: AuthCitizen
};

export class Auth {
  private secret: string;
  private refreshTokenSecret: string;
  readonly bcryptSaltRounds: number;

  constructor(secret: string, refreshTokenSecret: string, bcryptSaltRounds: number) {
    this.secret = secret;
    this.refreshTokenSecret = refreshTokenSecret;
    this.bcryptSaltRounds = bcryptSaltRounds;
  }

  /**
   * Generates the hash of the given password using Bcrypt
   * @param password 
   * @returns 
   */
  public async getHash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.bcryptSaltRounds); 
  }

  /**
   * Compares the given password and hash using Bcrypt
   * @param password 
   * @param hash 
   * @returns 
   */
  public async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Generates a JWT access token using the given payload data
   * @param user
   * @param signOptions
   * @returns 
   */
  public getToken(user: AuthUser, signOptions: SignOptions = {}): string {
    const payload: TokenPayload = {
      user
    };

    signOptions = {
      ...{
        expiresIn: '1h'
      },
      ...signOptions
    }

    return jwt.sign(payload, this.secret, signOptions);
  }

  /**
   * Generates a JWT refresh token using the given payload data
   * @param user
   * @param signOptions
   * @returns 
   */
  public getRefreshToken(user: AuthCitizen, signOptions: SignOptions = {}): string {
    const payload: RefreshTokenPayload = {
      user
    };

    signOptions = {
      ...{
        expiresIn: '1m'
      },
      ...signOptions
    }

    return jwt.sign(payload, this.refreshTokenSecret, signOptions);
  }

  /**
   * Verifies the given JWT access token and returns its payload
   * @param token 
   * @returns 
   */
  public verifyToken(token: string): TokenPayload {
    const payload = jwt.verify(token, this.secret);

    if (typeof payload === 'string' || !payload.user) {
      throw new Error('token payload is invalid');
    }

    return { 
      user: payload.user
    };
  }

  /**
   * Verifies the given JWT refresh token and returns its payload
   * @param token 
   * @returns 
   */
  public verifyRefreshToken(token: string): RefreshTokenPayload {
    const payload = jwt.verify(token, this.refreshTokenSecret);

    if (typeof payload === 'string' || !payload.user) {
      throw new Error('token payload is invalid');
    }

    return { 
      user: payload.user
    };
  }

  /**
   * Verifies the authorization header
   * @param headers 
   * @returns 
   */
  public verifyAuth(headers: IObject): TokenPayload {
    if (!headers['authorization']) {
      throw new Error('authorization header is missing');
    }

    const authHeader = headers['authorization'];
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new Error('authorization header is invalid');
    }

    return this.verifyToken(token);
  }

  /**
   * Compares the given needed and user's role
   * @param neededRole 
   * @param role 
   */
  public verifyRole(neededRole: TAuthRole | undefined, role: TAuthRole | undefined): void {
    if (neededRole && neededRole !== 'guest' && role !== 'admin' && neededRole !== role) {
      throw new Error(`logged user do not have ${neededRole} role`);
    }
  }
}

export const auth = new Auth(
  authConfig.secret,
  authConfig.refreshSecret,
  authConfig.bcryptSaltRounds
);