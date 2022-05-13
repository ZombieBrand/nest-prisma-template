import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.CONFLICT;
    const message = exception.meta;
    console.log(exception);
    switch (exception.code) {
      case 'P2002':
        response.status(status).json({
          code: -1,
          message: `${message.target}已存在`,
        });
        break;
      case 'P2025':
        response.status(status).json({
          code: -1,
          message: message.cause,
        });
        break;
      // TODO catch other error codes (e.g. 'P2000' or 'P2025')
      default:
        // default 500 error code
        console.log('PrismaClientExceptionFilter', exception.code);
        super.catch(exception, host);
        break;
    }
  }
}
