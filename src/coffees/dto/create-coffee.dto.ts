// DTO数据转对象,作用是请求载荷指定数据参数
// class-validator 是一个基于 TypeScript 的校验器,可以用来校验请求载荷数据
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称必填' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '品牌' })
  @IsOptional()
  @IsString()
  readonly brand?: string;

  @ApiProperty({ description: '口味' })
  @IsOptional() // 检查值是否丢失，如果丢失，则忽略所有验证器
  @IsString({ each: true })
  readonly flavors?: string[];
}
