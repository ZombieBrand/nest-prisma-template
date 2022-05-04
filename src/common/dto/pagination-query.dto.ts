import { IsOptional, IsPositive, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';
export class PaginationQueryDto {
  @ValidateIf((o) => !Number.isNaN(o.limit)) // 如果limit是空字符串，则不验证,隐士转换会把空字符串转换成NaN
  @Transform(({ value }) => (Number.isNaN(value) ? undefined : value)) // 如果limit是NaN，则转换成undefined,primma接收undefined会查找全部数据
  @IsOptional() // 表示可选,若是无值，则不验证
  @IsPositive() // 表示只能是正整数
  limit?: number;

  @ValidateIf((o) => !Number.isNaN(o.offset))
  @Transform(({ value }) => (Number.isNaN(value) ? undefined : value))
  @IsOptional()
  @IsPositive()
  offset?: number;
}
