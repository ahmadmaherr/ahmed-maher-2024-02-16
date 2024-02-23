import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { AuthModel } from './models/auth.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayloadInterface): Promise<User | null> {
    return await this.userService.findById(payload.id);
  }

  async authenticate(auth: AuthModel): Promise<any> {
    const user = await this.userService.findByEmailWithPassword(auth.email);

    if (!user) {
      throw new BadRequestException();
    }

    const isRightPassword = await this.userService.compareHash(
      auth.password,
      user.password,
    );
    if (!isRightPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      id: user.id,
      email: user.email,
      grant: user.grant,
      name: user.username,
      token:  this.jwtService.sign({ id: user.id }),
    };
  }
}