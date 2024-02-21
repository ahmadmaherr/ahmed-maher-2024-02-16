// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';

import { IsString, IsNumber, IsEmail } from "class-validator";

export enum IGrant {
  ADMIN = 0,
  EDITOR = 1,
  READER = 2,
}


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  username: string;

  @IsString()
  @Column({
    select: false,
  })
  password: string;

  @IsEmail()
  @Column({
    unique: true,
  })
  email: string;

  @IsNumber()
  @Column({
    nullable: false,
  })
  grant: number;

  // Define the one-to-many relationship with Post entity
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}



