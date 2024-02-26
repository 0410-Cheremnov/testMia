import { Controller, Post, Body, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScheduleService } from './services/schedule.service';
import { GetScheduleFilterDto } from './dtos/get-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@ApiTags('Получение расписания врачей')
@Controller('api')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    ) {}

  @Get('getSchedule')
  @ApiOperation({
    operationId: 'getSchedule',
    description: 'Метод возвращает расписание врачей',
  })
  @HttpCode(HttpStatus.OK)
  async getSchedule(@Query() filterDto: GetScheduleFilterDto): Promise<Schedule[]> {
    return this.scheduleService.getSchedule(filterDto);
  }
}
