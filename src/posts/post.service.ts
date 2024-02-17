import { Injectable, Req } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { createPostType } from './utlis/types';
import { Request } from 'express';



@Injectable( )
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ){}


  async create(@Req() request: any, createPostDto: CreatePostDto) {
    const userId = request.user.id;


    const newPost = this.postsRepository.create({
      ...createPostDto,
      authorId: userId, 
    });

    // Save the new post entity to the database
    return await this.postsRepository.save(newPost);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async findOne(id: number) {
    return await this.postsRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const toUpdate = await this.postsRepository.findOne({ where: { id } });

    const updated = Object.assign(toUpdate, updatePostDto);

    return await this.postsRepository.save(updated);
  }

  async remove(id: number) {
    return await this.postsRepository.delete(id);
  }
}