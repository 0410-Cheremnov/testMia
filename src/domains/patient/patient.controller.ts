import { Controller, Post, Body, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PatientService } from './services/patient.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { Patient } from './entities/patient.entity';

@ApiTags('Создание пациента')
@Controller('api')
export class PatientController {
  constructor(
    private readonly patientService: PatientService
    ) {}

  @Post('createPatient')
  @ApiOperation({
    operationId: 'createNewPatient',
    description: 'Метод создает нового пациента клиники',
  })
  @HttpCode(HttpStatus.CREATED)
  async createPatient(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientService.createPatient(createPatientDto);
  }
}