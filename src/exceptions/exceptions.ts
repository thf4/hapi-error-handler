import { Boom } from '@hapi/boom';

interface Options {
  statusCode: number;
}
const options: Options = {
  statusCode: 0,
};

class BadRequestException extends Boom {
  constructor(message: string) {
    super(message, { ...options, statusCode: 400 })
  }
};

class NotFoundException extends Boom {
  constructor(message: string) {
    super(message, { ...options, statusCode: 404 })
  }
};
class UnprocessableEntityException extends Boom {
  constructor(message: string) {
    super(message, { ...options, statusCode: 422 })
  }
};
class BadGatewayException extends Boom {
  constructor(message: string) {
    super(message, { ...options, statusCode: 502 })
  }
};
class ServiceUnavailableException extends Boom {
  constructor(message: string) {
    super(message, { ...options, statusCode: 503 })
  }
};

export {
  BadGatewayException,
  BadRequestException,
  ServiceUnavailableException,
  UnprocessableEntityException,
  NotFoundException
}