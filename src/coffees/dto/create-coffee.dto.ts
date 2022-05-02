// DTO数据转对象,作用是请求载荷指定数据参数
// class-validator 是一个基于 TypeScript 的校验器,可以用来校验请求载荷数据
import { IsString } from 'class-validator';
export class CreateCoffeeDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly brand?: string;
  @IsString({ each: true }) // each: true表示数组
  readonly flavor?: string[];
}