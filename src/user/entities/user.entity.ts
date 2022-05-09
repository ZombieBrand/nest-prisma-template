import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
export class UserEntity implements User {
  /**
   * id
   * @example 'cl2ptm7320000541vb7cdh41y'
   */
  id: string;

  /**
   * 名称
   * @example 'xx用户名'
   */
  username: string;

  /**
   * 昵称
   * @example 'xx昵称'
   */
  nickname: string;
  /**
   * 密码
   * @example '$2a$10$7QxVkiKgpJOMPrb2OgJphunMaxFE7ymGO.NxEzBC4k70AsM0spAtC'
   */
  @Exclude() // 过滤不返回字段
  password: string;
  /**
   * 头像
   * @example 'http:xxxxxx.png'
   */
  avatar: string;
  /**
   * 邮箱
   * @example 'xxxxx@emai.com'
   */
  email: string;
  /**
   * 角色
   * @example 'USER'
   */
  role: Role;
  /**
   * 生成时间
   * @example '2022-05-03T15:17:54.438Z'
   */
  createdAt: Date;
  /**
   * 更新时间
   * @example '2022-05-03T15:17:54.438Z'
   */
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
