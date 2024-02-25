import { ApiProperty } from "@nestjs/swagger";

export class CreatePatientDto {
    @ApiProperty({ type: 'text', description: 'Номер телефона пациента' })
    phone: string;
    @ApiProperty({ type: 'text', description: 'Имя пациента' })
    name: string;
    @ApiProperty({ type: 'text', description: 'E-mail пациента' })
    email: string;
    @ApiProperty({ type: 'text', description: 'Пол пациента' })
    gender: 'male' | 'female' | 'other';
  }