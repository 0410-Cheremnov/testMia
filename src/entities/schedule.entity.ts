import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Doctor } from './doctor.entity';
  import { Patient } from './patient.entity';
  
  @Entity('schedules')
  export class Schedule {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Doctor)
    @JoinColumn({ name: 'doctor_id' })
    doctor: Doctor;
  
    @Column('uuid')
    doctor_id: string;
  
    @Column('date')
    date: string;
  
    @Column('timestamp without time zone')
    time_from: Date;
  
    @Column('timestamp without time zone')
    time_to: Date;
  
    @Column({ type: 'boolean', default: true })
    is_free: boolean;
  
    @ManyToOne(() => Patient, { nullable: true })
    @JoinColumn({ name: 'patient_id' })
    patient?: Patient;
  
    @Column('uuid', { nullable: true })
    patient_id?: string;
  
    @Column({ type: 'integer' })
    type: number; // 0 - первичный прием, 1 - повторный
  }