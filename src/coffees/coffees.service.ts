import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Coffee as CoffeeModel, Flavor as FlavorModel } from '@prisma/client';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { flavorsTranserConnectOrCreate } from 'src/coffees/utils/transerConnectOrCreate';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigService, ConfigType } from '@nestjs/config';
import coffeesConfig from 'src/coffees/config/coffees.config';
@Injectable()
export class CoffeesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    @Inject(coffeesConfig.KEY)
    private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[], // 注入自定义提供器,@Inject(COFFEE_BRANDS)是modeule里面的providers中的一个自定义提供器
  ) {
    // 上边@Inject(COFFEE_BRANDS)
    console.log(
      '%c [ coffeeBrands ]-16',
      'font-size:13px; background:pink; color:#bf2c9f;',
      coffeeBrands,
    ); // ['buddy brew', 'nescafe']

    // .env key value
    const databaseHost = this.configService.get<string>(
      'POSTGRES_DB',
      '第二参数默认值',
    );
    console.log(
      '%c [ databaseHost ]-23',
      'font-size:13px; background:pink; color:#bf2c9f;',
      databaseHost,
    );

    // src/config/app.config.ts key value,通过app.module.ts注入
    const appConfig = this.configService.get<any>('database');
    console.log(
      '%c [ appConfig ]-33',
      'font-size:13px; background:pink; color:#bf2c9f;',
      appConfig,
    );

    // 局部coffees.config.ts 注入
    console.log(coffeesConfiguration, 'coffeesConfiguration');
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<CoffeeModel[]> {
    const { limit, offset } = paginationQuery;
    return this.prismaService.coffee.findMany({
      take: limit,
      skip: offset,
      include: {
        flavors: true,
      },
    });
  }

  async findOne(id: string): Promise<CoffeeModel> {
    const coffee = await this.prismaService.coffee.findUnique({
      where: {
        id: id,
      },
      include: {
        flavors: true,
      },
    });
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found,`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  async findFlavor(id: string): Promise<FlavorModel> {
    return await this.prismaService.flavor.findUnique({
      where: {
        id: id,
      },
      include: {
        coffees: true,
      },
    });
  }
  async create(createCoffeeDto: CreateCoffeeDto) {
    const { flavors, ...coffeeData } = createCoffeeDto;
    return this.prismaService.coffee.create({
      data: {
        ...coffeeData,
        flavors: {
          connectOrCreate: flavorsTranserConnectOrCreate(flavors),
        },
      },
    });
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const { flavors, ...coffeeData } = updateCoffeeDto;
    return this.prismaService.coffee.update({
      where: {
        id: id,
      },
      data: {
        ...coffeeData,
        flavors: {
          connectOrCreate: flavorsTranserConnectOrCreate(flavors),
        },
      },
    });
  }

  async remove(id: string) {
    try {
      const result = await this.prismaService.coffee.delete({
        where: {
          id: id,
        },
      });
      console.log(result);
      return {
        code: 200,
        msg: '删除成功',
      };
    } catch (error) {
      console.log(error);
      return {
        code: 400,
        msg: '删除失败',
      };
    }
  }
}
