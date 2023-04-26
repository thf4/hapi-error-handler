import { isBoom } from '@hapi/boom';
import { BadGatewayException, BadRequestException, NotFoundException, ServiceUnavailableException, UnprocessableEntityException } from './exceptions';

class ErrorHandler {
  constructor() { }

  private errorMaper(message: string, code: number) {
    const errorHandler = {
      400: new BadRequestException(message),
      404: new NotFoundException(message),
      422: new UnprocessableEntityException(message),
      502: new BadGatewayException(message),
      503: new ServiceUnavailableException(message)
    };
    return errorHandler[code];
  };

  handler(error: any) {
    const axiosCode = error?.response?.status;
    if (isBoom(error)) {
      const boomCode = error?.output?.statusCode;
      throw this.errorMaper(error.message, axiosCode || boomCode);
    };
    throw error;
  };
}

export default ErrorHandler