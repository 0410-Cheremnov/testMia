import { AppService } from './app.service';
import { Controller, Post, Body, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import { Schedule } from './entities/schedule.entity';
import { GetScheduleFilterDto } from './dtos/get-schedule.dto';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('МИС')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('createPatient')
  @ApiOperation({
    operationId: 'createNewPatient',
    description: 'Метод создает нового пациента клиники',
  })
  @HttpCode(HttpStatus.CREATED)
  async createPatient(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.appService.createPatient(createPatientDto);
  }

  @Get('getSchedule')
  @ApiOperation({
    operationId: 'getSchedule',
    description: 'Метод возвращает расписание врачей',
  })
  @HttpCode(HttpStatus.OK)
  async getSchedule(@Query() filterDto: GetScheduleFilterDto): Promise<Schedule[]> {
    return this.appService.getSchedule(filterDto);
  }

  @Post('createAppointment')
  @ApiOperation({
    operationId: 'createAppointment',
    description: 'Метод создает запись на прием',
  })
  @HttpCode(HttpStatus.CREATED)
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Schedule> {
    return await this.appService.createAppointment(createAppointmentDto);
  }
}
