import IObject from './interfaces/IObject';

export class HTTPError extends Error {
  readonly code: number;
  readonly info: IObject | undefined;

  constructor(message: string, code: number = 404, info?: IObject) {
    super(message ?? 'unknowm error');

    this.name = 'HTTPError';
    this.code = code;
    this.info = info;
  }
}