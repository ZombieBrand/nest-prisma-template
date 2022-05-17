import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false, // 设置为全局,默认为false, true=***.module.ts中不用在引入ConfigModule并且注入imports中
      load: [appConfig],
      validationSchema: Joi.object({
        // 使用Joi验证.env中参数不能缺失
        POSTGRES_HOST: Joi.required(),
        POSTGRES_USER: Joi.required(),
        POSTGRES_PASSWORD: Joi.required(),
        POSTGRES_DB: Joi.required(),
        POSTGRES_PORT: Joi.number(),
        SECRET: Joi.required(),
      }),
    }),
    PrismaModule,
    CoffeesModule,
    ProductsModule,
    CommonModule,
    UserModule,
    AuthModule,
    ServeStaticModule.forRoot({
      //配置静态资源服务开启和地址
      rootPath: join(process.cwd(), 'public'),
      exclude: ['/api*'],
    }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => ({
    //     type: 'postgres',
    //     host: process.env.POSTGRES_HOST,
    //     port: process.env.POSTGRES_PORT,
    //     username: process.env.POSTGRES_USER,
    //     password: process.env.POSTGRES_PASSWORD,
    //     database: process.env.POSTGRES_DB,
    //     autoLoadEntities: true,
    //     synchronize: true, // 生产环境不能设置true
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
