import { Flavor } from '@prisma/client';
import { CoffeeEntity } from './coffee.entity';
export class FlavorEntity implements Flavor {
  /**
   * id
   * @example 'cl2ptm7320000541vb7cdh41y'
   */
  id: string;

  /**
   * 风味名称
   * @example '酸'
   */
  name: string;

  /**
   * 咖啡数据
   * @example [{id: cl2ptm7320000541vb17cdh41y, name: 幻想咖啡2, brand: 幻想咖啡2}]
   */
  coffees: CoffeeEntity[];
  constructor(partial: Partial<FlavorEntity>) {
    Object.assign(this, partial);
  }
}
