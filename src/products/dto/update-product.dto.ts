import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
// PartialType文档 https://docs.nestjs.com/openapi/mapped-types#partial
export class UpdateProductDto extends PartialType(CreateProductDto) {}
