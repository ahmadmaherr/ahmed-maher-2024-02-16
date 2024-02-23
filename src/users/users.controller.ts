import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    UnprocessableEntityException,
    Put,
    Get,
    Param,
    NotFoundException,
    UseGuards,
    Request,
  } from "@nestjs/common";
  import { AuthGuard } from "@nestjs/passport";
  
  import { Roles } from "./roles.decorator";
  import { RolesGuard } from "./roles.guard";
  
  import { UserModel } from "../auth/models/user.model";
  import { User } from "./entities/user.entity";
  import { UsersService } from "./users.service";
  @Controller("users")
  export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Get("/profile")
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles("admin", "teacher", "student")
    async getProfile(@Request() req): Promise<User[]> {
      return req.user;
    }
  
    @Get("/:id")
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles("admin")
    async getUserById(@Param("id") id: number): Promise<User> {
      const user = this.userService.findById(id);
  
      if (!user) {
        throw new NotFoundException();
      }
  
      return user;
    }
  
    @Get()
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles("admin")
    async getAllUsers(): Promise<User[]> {
      return await this.userService.findAll();
    }
  
    @Post()
    async addUser(
      @Body(new ValidationPipe()) userModel: UserModel
    ): Promise<User> {
      const user = await this.userService.findByEmail(userModel.email);
  
      if (user) {
        throw new UnprocessableEntityException();
      }
  
      return await this.userService.create(userModel);
    }
  
    @Put()
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles("admin")
    async updateUser(@Body() user: UserModel): Promise<User> {
      const User = await this.userService.findByEmail(user.email);
  
      if (!User) {
        throw new UnprocessableEntityException();
      }
  
      return await this.userService.update(User, user);
    }
  }