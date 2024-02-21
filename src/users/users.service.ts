import * as bcrypt from "bcrypt";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { ConfigService, InjectConfig } from "nestjs-config";

import { User } from "./entities/user.entity";
import { UserModel } from "src/auth/models/user.model";

@Injectable()
export class UsersService {
  private saltRounds: number;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectConfig() private readonly config: ConfigService
  ) {
    this.saltRounds = config.get("app.salt_rounds", 10);
  }

  async create(user: UserModel): Promise<User> {
    const userToCreate = {
      ...user,
      password: await this.getHash(user.password),
    };

    const result = await this.userRepository.save(
      this.userRepository.create(userToCreate)
    );

    return result;
  }

  async update(User: User, user: UserModel): Promise<User> {
    return await this.userRepository.save({
      ...User,
      name: user.name,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOneOrFail({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getHash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async destroy(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async findByEmailWithPassword(email: string): Promise<User> | null {
    return await this.userRepository.findOne(
      {
        where: {
            email
        },
        select: ["email", "password", "id", "grant", "username"]
      }
    );
  }
}