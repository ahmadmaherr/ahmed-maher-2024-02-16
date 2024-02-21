import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostService } from './posts.service';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [PostsController],
    providers: [PostService]
})

export class PostsModule {}

