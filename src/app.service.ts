import { Injectable } from '@nestjs/common';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { GetScheduleFilterDto } from './dtos/get-schedule.dto';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}
  async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientsRepository.create(createPatientDto);
    return await this.patientsRepository.save(patient);
  }

  async getSchedule(getScheduleFilterDto: GetScheduleFilterDto): Promise<Schedule[]> {
    const { date, time_from, time_to, is_free, doctor_id, patient_id } = getScheduleFilterDto;
    const where: any = {};

    if (date) where.date = date;
    if (doctor_id) where.doctor_id = doctor_id;
    if (is_free !== undefined) where.is_free = is_free;
    if (patient_id) where.patient_id = patient_id;
    if (time_from && time_to) where.time_from = Between(time_from, time_to);

    const options: FindManyOptions<Schedule> = {
      where: where,
      order: { time_from: 'ASC' },
    };

    return await this.scheduleRepository.find(options);
  }

  async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Schedule> {
    const { schedule_id, patient_id } = createAppointmentDto;
    
    let appointment;
    try {
      appointment = await this.scheduleRepository.findOneOrFail({
        where: { id: schedule_id, is_free: true }
      });
    } catch (error) {
      throw new Error('Этот слот занят или не найден!');
    }
  
    const now = new Date();
    if (appointment.time_from < now) {
      throw new Error('Ошибка, время слота истекло!');
    }
  
    appointment.is_free = false;
    appointment.patient_id = patient_id;
  
    return await this.scheduleRepository.save(appointment);
  }

  }
  

