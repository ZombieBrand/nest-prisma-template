import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Coffee as CoffeeModel } from '@prisma/client';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
@Injectable()
export class CoffeesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<CoffeeModel[]> {
    return this.prismaService.coffee.findMany();
  }

  async findOne(id: string) {
    const coffee = await this.prismaService.coffee.findUnique({
      where: {
        id: id,
      },
    });
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found,`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  async findFlavor(id: string) {
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
          create: flavors,
        },
      },
    });
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    return this.prismaService.coffee.update({
      where: {
        id: id,
      },
      data: updateCoffeeDto,
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
