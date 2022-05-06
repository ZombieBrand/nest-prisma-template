import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import appConfig from './config/app.config';

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
      }),
    }),
    PrismaModule,
    CoffeesModule,
    ProductsModule,
    CommonModule,
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
