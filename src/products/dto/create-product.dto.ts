import {
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  /**
   * 产品名称
   * @example '衣服'
   */
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  /**
   * 产品描述
   * @example 'xx衣服'
   */
  @IsOptional()
  @MaxLength(150)
  description?: string;

  /**
   * 产品价格
   * @example 100
   */
  @Min(1.0)
  price: number;

  /**
   * 产品库存量
   * @example '200件'
   */
  @IsNotEmpty()
  @MinLength(5)
  sku: string;
  /**
   * 产品是否发布
   * @example true
   */
  published?: boolean = false;
}
