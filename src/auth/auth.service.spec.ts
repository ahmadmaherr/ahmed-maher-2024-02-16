import * as path from "path";

import { INestApplication, BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "nestjs-config";

import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entities/user.entity";
import { AuthModule } from "./auth.module";

describe("AuthService", () => {
  let app: INestApplication;
  let module: TestingModule;
  let authService: AuthService;
  let payload: string;
  let userService: UsersService;
  let user: User;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.load(path.resolve(__dirname, "../", "config", "*.ts")),
        TypeOrmModule.forRootAsync({
          useFactory: (config: ConfigService) => config.get("database"),
          inject: [ConfigService],
        }),
        UsersModule,
        AuthModule,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    authService = module.get(AuthService);
    userService = module.get(UsersService);
  });

  it("authenticate fail", async () => {
    let error;
    try {
      await authService.authenticate({
        email: "no email",
        password: "df",
      });
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(BadRequestException);
  });

  it("authenticate", async () => {
    user = await userService.create({
      email: "email@email.com",
      password: "testtest",
      name: "test",
      grant: 1,
    });

    payload = await authService.authenticate({
      email: "email@email.com",
      password: "testtest",
    });
  });

  it("validateUser", async () => {
    const result = await authService.validateUser(user);
    expect(result).toBeInstanceOf(User);
  });

  afterAll(async () => {
    await userService.destroy(user.id);
    app.close();
  });
});