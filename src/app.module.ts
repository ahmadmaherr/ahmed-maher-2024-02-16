import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';
import { User } from './users/entities/user.entity';
import { registerAs } from '@nestjs/config';
import { UserController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [PostsModule,
      TypeOrmModule.forRoot({
        type: process.env.DB_TYPE as any,
        host: process.env.PG_HOST,
        port: parseInt(process.env.PG_PORT),
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB,
        entities: [Post, User],
        synchronize: true,
      }),
      UsersModule,
      AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
