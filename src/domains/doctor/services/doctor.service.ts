import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/domains/schedule/entities/schedule.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from '../dtos/create-appointment.dto';


@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}
  
  async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Schedule> {
    const { schedule_id, patient_id } = createAppointmentDto;
    
     const appointment = await this.scheduleRepository.findOne({
      where: { id: schedule_id, is_free: true }
    });
    if(!appointment) {
      throw new ConflictException('Этот слот занят или не найден!');
    }
  
    const now = new Date();
    if (appointment.time_from < now) {
      throw new ConflictException('Ошибка, время слота истекло!');
    }
  
    appointment.is_free = false;
    appointment.patient_id = patient_id;
  
    return await this.scheduleRepository.save(appointment);
  }

  }