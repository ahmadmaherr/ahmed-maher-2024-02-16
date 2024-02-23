import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostService } from './posts.service';
import { Request } from 'express';
import { RolesGuard } from '../users/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../users/roles.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin", "editor", "reader")
  findAll() {
    return this.postService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin", "editor")
  create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    return this.postService.create(createPostDto, request);
  }

  @Get(':id')
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin", "editor", "reader")
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin", "editor")
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin", "editor")
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  //     @Post()
  //     async create(@Body() createPostDto: CreatePostDto) {
  //   }
}