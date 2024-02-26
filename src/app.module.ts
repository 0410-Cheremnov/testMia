import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DoctorModule } from './domains/doctor/doctor.module';
import { PatientModule } from './domains/patient/patient.module';
import { ScheduleModule } from './domains/schedule/schedule.module';
import { NotificationModule } from './domains/notification/notification.module';



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
    DoctorModule,
    PatientModule,
    ScheduleModule,
    NotificationModule
  ],
  controllers: [],
})
export class AppModule {}
