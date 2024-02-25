import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentDto {
    @ApiProperty({ type: 'string', format: 'uuid' })
    readonly patient_id: string;
    @ApiProperty({ type: 'string', format: 'uuid' })
    readonly doctor_id: string;
    @ApiProperty({ type: 'string', format: 'uuid' })
    readonly schedule_id: string;
  }