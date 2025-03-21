import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/logger/logger';
import { AllExceptionsFilter } from './common/logger/ali-expression.logger';

async function start() {
  const PORT = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());

  app.enableCors({ origin: '*' });

   const config = new DocumentBuilder()
     .addBearerAuth({
       type: 'http',
       scheme: 'bearer',
       bearerFormat: 'JWT',
       description: 'Add the api bearer token',
     })
     .setTitle('Furnishings')
     .setDescription(
       'Furnishings is an online platform designed to streamline furniture ordering and management. Users can browse a wide range of furnishings, customize their preferences, track orders, manage delivery schedules, and securely store transaction and user data.',
     )
     .setVersion('1.0')
     .addTag('Nestjs, validation, swagger, guard, mongodb')
     .build();

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api/docs', app, document);

   await app.listen(PORT, () =>
     console.log(`Server running at port http://localhost:${PORT}`),
   );
}

start();
