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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';
@Controller('coffees')
@ApiTags('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @ApiOkResponse({
    type: [CoffeeEntity],
    description: '自定义描述获取全部coffees',
  })
  @ApiOperation({ summary: '获取所有咖啡' })
  @Get()
  @Public() // 公开接口可以不用jwt验证
  async findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log(protocol, '自定义参数装饰器@Protocol');
    // throw new HttpException('咖啡不存在', 1200);
    const coffees = await this.coffeesService.findAll(paginationQuery);
    return coffees.map((coffee) => new CoffeeEntity(coffee));
  }

  @Get(':id')
  @ApiOkResponse({ type: CoffeeEntity })
  @ApiOperation({ summary: '获取指定id咖啡' })
  async findOne(@Param('id', ParseIntPipe) id: string) {
    const coffee = await this.coffeesService.findOne(id);
    return new CoffeeEntity(coffee);
  }

  @Post()
  @ApiCreatedResponse({ status: 201, type: CoffeeEntity })
  @ApiOperation({ summary: '新增咖啡' })
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return new CoffeeEntity(await this.coffeesService.create(createCoffeeDto));
  }

  @Patch(':id')
  @ApiOkResponse({ type: CoffeeEntity })
  @ApiOperation({ summary: '更新咖啡' })
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
  @ApiOperation({ summary: '删除咖啡' })
  async remove(@Param('id') id: string) {
    return await this.coffeesService.remove(id);
  }

  @Get('/flavor/:id')
  @ApiOkResponse({ type: FlavorEntity })
  @ApiOperation({ summary: '获取咖啡口味信息' })
  async findFlavor(@Param('id') id: string) {
    return new FlavorEntity(await this.coffeesService.findFlavor(id));
  }
}
