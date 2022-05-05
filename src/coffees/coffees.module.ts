import { Module, Injectable } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from 'src/coffees/config/coffees.config';
// 服务配置类
class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  async create() {
    /* 假设下边的值需要通过数据库异步获取到后返回 */
    const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
    return coffeeBrands;
  }
}

@Module({
  imports: [
    ConfigModule, // 注入全局config数据
    ConfigModule.forFeature(coffeesConfig), // 注入局部coffees.config数据
  ], // ConfigModule是app.module.ts中的ConfigModule配置全局变量
  controllers: [CoffeesController],
  providers: [
    CoffeesService, // 这里表示提供了CoffeesService
    {
      provide: ConfigService, // 这里表示提供了ConfigService
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    CoffeeBrandsFactory, // 注意这里要提供CoffeeBrandsFactory,否则下边的useFactory会报错无法解析依赖关系
    {
      provide: COFFEE_BRANDS, // 自定义提供器TOKEN
      inject: [CoffeeBrandsFactory], // 自定义提供器依赖
      useFactory: async (brandsFactory: CoffeeBrandsFactory) => {
        // 自定义提供器值, 使用工厂函数方式,这种方式可以实现异步获取,避免异步获取成功之前模块先执行其他操作
        const coffeeBrands = await brandsFactory.create();
        return coffeeBrands;
      },
      // useValue: ['buddy brew', 'nescafe'], // 使用值方式
    },
  ],
})
export class CoffeesModule {}
