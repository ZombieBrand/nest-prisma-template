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
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CoffeeEntity } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavors.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
@Controller('coffees')
@ApiTags('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Public()
  @Get()
  @ApiOkResponse({ type: [CoffeeEntity] })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const coffees = await this.coffeesService.findAll(paginationQuery);
    return coffees.map((coffee) => new CoffeeEntity(coffee));
  }

  @Get(':id')
  @ApiOkResponse({ type: CoffeeEntity })
  async findOne(@Param('id') id: string) {
    const coffee = await this.coffeesService.findOne(id);
    console.log(new CoffeeEntity(coffee));
    return new CoffeeEntity(coffee);
  }

  @Post()
  @ApiCreatedResponse({ status: 201, type: CoffeeEntity })
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return new CoffeeEntity(await this.coffeesService.create(createCoffeeDto));
  }

  @Patch(':id')
  @ApiOkResponse({ type: CoffeeEntity })
  async update(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return new CoffeeEntity(
      await this.coffeesService.update(id, updateCoffeeDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: CoffeeEntity })
  async remove(@Param('id') id: string) {
    return await this.coffeesService.remove(id);
  }

  @Get('/flavor/:id')
  @ApiOkResponse({ type: FlavorEntity })
  async findFlavor(@Param('id') id: string) {
    return new FlavorEntity(await this.coffeesService.findFlavor(id));
  }
}
