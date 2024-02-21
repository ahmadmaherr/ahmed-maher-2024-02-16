import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostService } from './posts.service';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  // @Get()
  // findAll(): string {
  //     return "hey"
  // }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    return this.postService.create(createPostDto, request);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  //     @Post()
  //     async create(@Body() createPostDto: CreatePostDto) {
  //   }
}