import { IsBoolean, IsDateString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetScheduleFilterDto {
  @ApiProperty({ type: 'date', description: 'Дата приема' })
  @IsDateString()
  date: string;  // Формат YYYY-MM-DD

  @ApiProperty({ type: 'date', description: 'Время с' })
  @IsOptional()
  @IsDateString()
  time_from?: Date;

  @ApiProperty({ type: 'date', description: 'Время по' })
  @IsOptional()
  @IsDateString()
  time_to?: Date;

  @ApiProperty({type:'boolean', description: 'Свободен ли слот'})
  @IsOptional()
  @IsBoolean()
  is_free?: boolean;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  doctor_id?: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  patient_id?: string;
}