import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  async findAll() {
    return this.prisma.product.findMany({ where: { published: true } });
  }

  async findDrafts() {
    return this.prisma.product.findMany({ where: { published: false } });
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id: id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id: id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({ where: { id: id } });
  }
}
