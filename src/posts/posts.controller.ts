import { Controller, Get } from '@nestjs/common';
// import { post } from './interfaces/cat.interface';


@Controller('posts')
export class PostsController {
    @Get()
    findAll(): string {
        return 'This action returns all cats';
      }
}
