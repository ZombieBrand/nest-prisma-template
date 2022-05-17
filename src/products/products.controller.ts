import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
// 下边依赖使用文档 https://docs.nestjs.com/openapi/operations#responses
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ status: 201, type: ProductEntity })
  async create(@Body() createProductDto: CreateProductDto) {
    const result = new ProductEntity(
      await this.productsService.create(createProductDto),
    );
    return {
      code: 0,
      data: result,
    };
  }

  @Get()
  @ApiOkResponse({ type: [ProductEntity] })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const products = await this.productsService.findAll(paginationQuery);
    return {
      code: 0,
      data: products.map((product) => new ProductEntity(product)),
    };
  }

  @Get('drafts')
  @ApiCreatedResponse({ type: [ProductEntity] })
  async findDrafts() {
    const drafts = await this.productsService.findDrafts();
    return {
      code: 0,
      data: drafts.map((product) => new ProductEntity(product)),
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  async findOne(@Param('id') id: string) {
    const product = new ProductEntity(await this.productsService.findOne(id));
    return {
      code: 0,
      data: product,
    };
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ProductEntity })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const result = new ProductEntity(
      await this.productsService.update(id, updateProductDto),
    );
    return {
      code: 0,
      data: result,
    };
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductEntity })
  async remove(@Param('id') id: string) {
    const result = new ProductEntity(await this.productsService.remove(id));
    return {
      code: 0,
      data: result,
    };
  }
}
