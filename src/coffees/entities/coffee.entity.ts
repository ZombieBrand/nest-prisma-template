import { Coffee } from '@prisma/client';
import { FlavorEntity } from './flavors.entity';
export class CoffeeEntity implements Coffee {
  /**
   * id
   * @example 'cl2ptm7320000541vb7cdh41y'
   */
  id: string;

  /**
   * 咖啡名称
   * @example '幻想咖啡2'
   */
  name: string;

  /**
   * 咖啡品牌
   * @example '幻想咖啡2'
   */
  brand: string;

  /**
   * 咖啡风味
   * @example [{ id: cl2ptm7320000541vb17cdh41y, name: 酸 }]
   */
  flavors: FlavorEntity[];

  constructor(partial: Partial<CoffeeEntity>) {
    Object.assign(this, partial);
  }
}
