import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ description: '账户' })
  @IsNotEmpty({ message: '账户必填' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: '昵称' })
  @IsOptional()
  @IsString()
  readonly nickname?: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码必填' })
  @MinLength(6, { message: '密码最少6位' })
  @MaxLength(16, { message: '密码最多16位' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: '头像' })
  @IsOptional()
  @IsString()
  readonly avatar?: string;

  @ApiProperty({ description: '邮箱' })
  @IsOptional()
  @IsString()
  readonly email?: string;

  @IsEnum(Role, { message: '角色必须是管理员或者用户' })
  readonly role: Role;
}
