import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.prisma.product.findMany({
      take: limit,
      skip: (offset - 1) * limit,
      where: { published: true },
    });
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
