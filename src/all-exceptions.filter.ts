import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MyLoggerService } from './my-logger/my-logger.service';
import { ResponseDto } from './users/dto/response.dto';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const responseDto: ResponseDto = {
        response: {
          statusCode: exception.getStatus(),
          message: 'Internal server error',
          response: exception.getResponse(),
        },
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        path: request.url,
      };

      this.logger.error(responseDto.response, responseDto.path);
    } else {
      const responseDto: ResponseDto = {
        response: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          response: response.locals.message,
        },
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        path: request.url,
      };

      this.logger.error(responseDto.response, responseDto.path);
    }
    super.catch(exception, host);
  }
}
