import { Injectable } from '@nestjs/common';
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
    console.log('validateUser');
    const user = await this.userService.findOne(username);
    const passwordChecking = await bcrypt.compareSync(
      password,
      user.password || '',
    );
    if (passwordChecking) {
      const { password, ...result } = user;
      console.log(password, result);
      return result;
    }
    return null;
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
