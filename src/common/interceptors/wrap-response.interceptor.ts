import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('before...,拦截器interceptor');
    return next.handle().pipe(
      map((data) => ({
        data,
        code: 0,
        message: '请求成功',
      })),
    );
  }
}
