import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateLicenseDto {
  @ApiProperty({ description: 'CPUID' })
  @IsNotEmpty({ message: 'CPUID必填' })
  readonly CPUID: string;

  @ApiProperty({ description: 'mac' })
  @IsNotEmpty({ message: 'mac地址必填' })
  readonly macAddress: string;

  @ApiProperty({ description: '公司名称' })
  @IsNotEmpty({ message: '公司名称必填' })
  readonly company: string;

  @ApiProperty({ description: '产品型号' })
  @IsNotEmpty({ message: '产品型号必填' })
  readonly model: string;

  @ApiProperty({ description: '申请时间' })
  @IsNotEmpty({ message: '申请时间必填' })
  readonly applyTime: Date;

  @ApiProperty({ description: '到期时间' })
  @IsNotEmpty({ message: '到期时间必填' })
  readonly deadline: Date;

  @ApiProperty({ description: '管理设备数量' })
  @IsNotEmpty({ message: '管理设备数量必填' })
  readonly manageDeviceNum: number;

  @ApiProperty({ description: '授权功能' })
  @IsOptional()
  @IsString()
  readonly functionModel?: string;
  @IsString()
  readonly telphone?: string;
  @IsString()
  readonly address?: string;
  @IsString()
  readonly reason?: string;
  readonly id?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
