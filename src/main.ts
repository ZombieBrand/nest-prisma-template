import { NestFactory, Reflector, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';
const listenPort = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  // 将ValidationPipe绑定到整个应用程序 https://docs.nestjs.com/techniques/validation#auto-validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // whitelist使用,请求参数含有dto没有属性是否过滤删除
      transform: true, // 请求参数是否进行转换,async findOne(@Param('id') id: string) 请求参数id如果是number类型则转换为string
      forbidNonWhitelisted: true, // 配合whitelist使用,请求参数含有dto没有属性返回错误提示信息,false则不会返回错误信息而是过滤无用信息执行
    }),
  );

  // 将转换应用于所有响应 https://docs.nestjs.com/techniques/serialization
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 将PrismaClientExceptionFilter应用到整个应用程序，需要HttpAdapterHost，因为它扩展了BaseExceptionFilter https://docs.nestjs.com/exception-filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // 配置Swagger文档
  const config = new DocumentBuilder()
    .setTitle('nest demo api document')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('all')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_doc', app, document);

  // 启动应用
  await app.listen(listenPort);
  console.log(`listen in http://localhost:${listenPort}`);
}
bootstrap();
