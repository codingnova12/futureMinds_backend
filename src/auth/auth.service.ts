import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { isHashPasswordMatch } from 'src/utils/bcrypt.utils';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new BadRequestException('User not found');
    const isMatch: boolean = await isHashPasswordMatch(password, user.password);  
    if (!isMatch) throw new BadRequestException('Password does not match');
    return user;
  }
  async login(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user._id };
    return { access_token: this.jwtService.sign(payload,{secret:this.configService.get('JWT_SECRET')}) };
  }
}
