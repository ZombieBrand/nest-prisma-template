import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
// import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from 'src/common/middeware/logging.middleware';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
@Module({
  imports: [ConfigModule],
  providers: [
    // {
    //   provide: APP_GUARD, 守卫注册
    //   useClass: ApiKeyGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');

    // 示例如何排除某个路由注册中间件
    // consumer
    //   .apply(LoggingMiddleware)
    //   .exclude('路由地址一', '路由地址二')
    //   .forRoutes('*');

    // 示例 如何根据指定路由地址和方法注册中间件
    // consumer
    //   .apply(LoggingMiddleware)
    //   .forRoutes({ path: 'coffees', method: RequestMethod.GET });
  }
}
