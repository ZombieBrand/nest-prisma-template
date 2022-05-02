import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from './create-coffee.dto';
// 默认情况下，所有这些字段都是必需的。要创建具有相同字段但每个字段都是可选的类型，请使用PartialType()传递类引用 ( CreateCatDto) 作为参数
// https://docs.nestjs.com/openapi/mapped-types#partial
// 这里可以实现CreateCoffeeDto所有属性继承并且是可选,因为更新Coffee参数是可选的
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
