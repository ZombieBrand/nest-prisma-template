import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse<Response>(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码
    const statusCode = status >= 400 && status < 600 ? status : 200;
    const exceptionResponse = exception.getResponse();
    const error =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);
    response.status(statusCode).json({
      ...error,
      code: status,
      timestamp: new Date().toISOString(),
    });
  }
}
// 使用方式 throw new HttpException('咖啡不存在', 401);
