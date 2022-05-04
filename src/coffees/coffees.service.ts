import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Coffee as CoffeeModel, Flavor as FlavorModel } from '@prisma/client';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { flavorsTranserConnectOrCreate } from 'src/coffees/utils/transerConnectOrCreate';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
@Injectable()
export class CoffeesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationQuery: PaginationQueryDto): Promise<CoffeeModel[]> {
    const { limit, offset } = paginationQuery;
    console.log(paginationQuery);
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
