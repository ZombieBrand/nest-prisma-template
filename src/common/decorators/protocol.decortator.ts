import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// 自定义参数装饰器
export const Protocol = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log('自定义参数装饰器Data参数是通过调用时传入的值', data);
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
  },
);
