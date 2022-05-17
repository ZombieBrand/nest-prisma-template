import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import initData from './initData/index';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 通过PrismaClientOptions，例如日志级别或错误格式化
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    await initData(this);

    this.$use(async (params, next) => {
      console.log('prisma中间件', params);
      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
