import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Patient } from './entities/patient.entity';
import { Doctor } from './entities/doctor.entity';
import { Schedule } from './entities/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'db', 
      port: 5432, 
      username: 'postgres', 
      password: 'postgres',
      database: 'test', 
      entities: [join(__dirname, '**', '*.entity.{ts,js}')], 
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Patient, Doctor, Schedule]), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
