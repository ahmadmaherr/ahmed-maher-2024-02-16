import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    UnprocessableEntityException,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthModel } from './models/auth.model';
import { UserModel } from './models/user.model';
  
  @Controller('auth')
  export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly userService: UsersService,
    ) {}
  
    @Post('/login')
    async login(@Body(new ValidationPipe()) auth: AuthModel): Promise<string> {
      return this.authService.authenticate(auth);
    }
  
    @Post('/register')
    async register(
      @Body(new ValidationPipe()) userModel: UserModel,
    ): Promise<string> {
      const emailExists = await this.userService.findByEmail(userModel.email);
  
      if (emailExists) {
        throw new UnprocessableEntityException();
      }
  
      await this.userService.create(userModel);
  
      return this.authService.authenticate(userModel);
    }
  }