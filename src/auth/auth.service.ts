import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new HttpException('账户不存在', -1);
    }
    const passwordChecking = await bcrypt.compareSync(
      password,
      user.password || '',
    );
    if (passwordChecking) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } else {
      throw new HttpException('密码错误', -1);
    }
  }

  async login(user) {
    const payload = { username: user.username, id: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserProfile(user) {
    const userInfo = await this.userService.getUserProfile(user.id);
    return userInfo;
  }
}
