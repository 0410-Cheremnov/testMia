import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata"
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


   async function bootstrap() {
     const app = await NestFactory.create(AppModule);

     const config = new DocumentBuilder()
       .setTitle('Апи для RobotMia')
       .setDescription('API медицинской информационной системы (МИС) и сервис напоминания о записи к врачу')
       .setVersion('1.0')
       .build();

     const document = SwaggerModule.createDocument(app, config);
     SwaggerModule.setup('api', app, document);

     await app.listen(3000);
   }

   bootstrap();
