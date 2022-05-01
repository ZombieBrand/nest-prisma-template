import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const listenPort = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 设置全局路由前缀

  const config = new DocumentBuilder()
    .setTitle('nest demo api document')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('all')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_doc', app, document);

  await app.listen(listenPort);
  console.log(`listen in http://localhost:${listenPort}`);
}
bootstrap();
