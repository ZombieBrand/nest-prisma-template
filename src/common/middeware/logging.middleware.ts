import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('middleware...,中间件');

    res.on('finish', () => console.timeEnd('Requset-response time'));
    next();
  }
}
