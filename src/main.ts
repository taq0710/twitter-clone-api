import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './core/transform/transform.interceptor';
import mongoose from 'mongoose';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use('/file', express.static(join(__dirname, '..', 'public')));

  app.useGlobalInterceptors(new TransformInterceptor());
  const options = new DocumentBuilder()
    .setTitle('MMO')
    .setDescription('MMO API description')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  mongoose.set('debug', true);

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);

  console.log(`URL Swagger ${process.env.BACKEND_URL}/docs`);
  console.log('Starting on ', PORT);
}
bootstrap();
