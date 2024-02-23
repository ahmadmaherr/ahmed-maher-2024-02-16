import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('Blog API')
  .setDescription(
    'This is an API of a blog where we have 3 different user roles and each one has specific privileges'
  )
  .setVersion('1.0')
  .addTag('blog-api')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(4000);


}
bootstrap();
         
