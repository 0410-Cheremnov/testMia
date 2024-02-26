import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { DoctorService } from './services/doctor.service';
import { Schedule } from '../schedule/entities/schedule.entity';
import { DoctorController } from './doctor.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, Schedule]), 
  ],
  providers: [DoctorService],
  controllers:[DoctorController],
  exports: [DoctorService]
})
export class DoctorModule {}