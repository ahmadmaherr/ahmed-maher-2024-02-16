import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';
import { registerAs } from '@nestjs/config';


@Module({
  imports: [PostsModule,
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Post],
        synchronize: true,
      })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
