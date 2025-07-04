import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('All of Health')
    .setDescription('Complete API for Server Operations')
    .setVersion('1.0')
    .addTag('health')
    .build();

  app.enableCors();
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(4000);
}

bootstrap();
