import { CoffeesService } from './coffees.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  async findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    console.log(limit, offset);
    return this.coffeesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.coffeesService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
