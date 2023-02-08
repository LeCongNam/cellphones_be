import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByParams({ username });
    if (user) {
      const isValidPassword = await compare(pass, user.password);
      if (user && isValidPassword) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    const refresh_token = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '90 day',
    });
    await this.userService.updateUser(payload.sub, {
      refresh_token,
    });

    const getuser = await this.userService.findOneByParams({ id: user.id });

    delete getuser.password;
    delete getuser.refresh_token;
    return {
      token: {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
        }),
        refresh_token,
      },
      data: getuser,
    };
  }
}
