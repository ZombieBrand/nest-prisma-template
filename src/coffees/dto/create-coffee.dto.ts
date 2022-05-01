import { ApiProperty } from '@nestjs/swagger';
export class CreateCoffeeDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  brand?: string;

  @ApiProperty({ required: false })
  flavor?: string[];
}
