import { Controller, Post, Body, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { Schedule } from '../schedule/entities/schedule.entity';
import { DoctorService } from './services/doctor.service';

@ApiTags('Запись к врачу')
@Controller('api')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    ) {}

  @Post('createAppointment')
  @ApiOperation({
    operationId: 'createAppointment',
    description: 'Метод создает запись на прием',
  })
  @HttpCode(HttpStatus.CREATED)
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Schedule> {
    return await this.doctorService.createAppointment(createAppointmentDto);
  }
}
