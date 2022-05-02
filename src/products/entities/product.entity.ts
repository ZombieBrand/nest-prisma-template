import { Product, Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';

export class ProductEntity implements Product {
  /**
   * id
   * @example 1
   */
  id: string;
  /**
   * 创建时间
   * @example '2022-05-01T10:00:15.639Z'
   */
  createdAt: Date;
  /**
   * 更新时间
   * @example '2022-05-02T10:00:15.639Z'
   */
  updatedAt: Date;
  /**
   * 产品名称
   * @example '衣服'
   */
  name: string;
  /**
   * 产品描述
   * @example 'xx衣服'
   */
  description: string | null;
  /**
   * 产品价格
   * @example 200
   */
  @Transform(({ value }) => value.toNumber())
  price: Prisma.Decimal;
  /**
   * 产品库存量
   * @example '200件'
   */
  sku: string;
  /**
   * 产品是否发布
   * @example true
   * description: true=发布，false=草稿
   */
  published: boolean;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
    // short for 👇
    // this.id = partial.id;
    // this.createdAt = partial.createdAt;
    // this.updatedAt = partial.updatedAt;
    // this.name = partial.name;
    // this.description = partial.description;
    // this.price = partial.price;
    // this.sku = partial.sku;
    // this.published = partial.published;
  }
}
