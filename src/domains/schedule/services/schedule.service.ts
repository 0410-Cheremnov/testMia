import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Schedule } from '../entities/schedule.entity';
import { GetScheduleFilterDto } from '../dtos/get-schedule.dto';


@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>
  ) {}

  async getSchedule(getScheduleFilterDto: GetScheduleFilterDto): Promise<Schedule[]> {
    const { date, time_from, time_to, is_free, doctor_id, patient_id } = getScheduleFilterDto;
    const where: FindOptionsWhere<Schedule> = {
      ...(date && {date}),
      ...(doctor_id && {doctor_id}),
      ...(is_free !== undefined && {is_free}),
      ...(patient_id &&{patient_id}),
      ...((time_from && time_to) && {time_from: Between(time_from, time_to)} )
    }

    const options: FindManyOptions<Schedule> = {
      where: where,
      order: { time_from: 'ASC' },
    };

    return await this.scheduleRepository.find(options);
  }
}