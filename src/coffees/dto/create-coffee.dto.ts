// DTO数据转对象,作用是请求载荷指定数据参数
// class-validator 是一个基于 TypeScript 的校验器,可以用来校验请求载荷数据
import { IsString, IsOptional, IsObject } from 'class-validator';
export class Flavor {
  @IsString()
  readonly name: string;
  @IsOptional()
  @IsObject({ each: true })
  readonly coffees?: CreateCoffeeDto[];
}
export class CreateCoffeeDto {
  @IsString()
  readonly name: string;
  @IsOptional()
  @IsString()
  readonly brand?: string;
  @IsOptional() // 检查值是否丢失，如果丢失，则忽略所有验证器
  @IsObject({ each: true })
  readonly flavors?: Flavor[];
}
