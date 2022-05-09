import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User as UserModule } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<UserModule> {
    const _createUserDto = { ...createUserDto };
    const { username, email } = _createUserDto;
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
    const existingEmail = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    if (existingEmail) {
      throw new HttpException('邮箱已存在', HttpStatus.BAD_REQUEST);
    }
    _createUserDto.password = await bcrypt.hash(_createUserDto.password, 10);
    return this.prismaService.user.create({
      data: {
        ..._createUserDto,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(username: string): Promise<UserModule | undefined> {
    const user = this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  }

  async getUserProfile(id: string): Promise<UserModule> {
    const userProfile = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    return userProfile;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
