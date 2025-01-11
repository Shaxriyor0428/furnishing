import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000'
        // 'http://another-domain.com',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new BadRequestException('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config_swagger = new DocumentBuilder()
    .setTitle('Furnishings')
    .setDescription(
      'Furnishings is an online platform designed to streamline furniture ordering and management. Users can browse a wide range of furnishings, customize their preferences, track orders, manage delivery schedules, and securely store transaction and user data.',
    )
    .setVersion('7.0')
    .addTag('Nestjs, TypeOrm, Validation')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config_swagger);
  SwaggerModule.setup('api/docs', app, documentFactory);
  await app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
}

start();
