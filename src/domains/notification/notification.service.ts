import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Patient } from '../patient/entities/patient.entity';
import { Schedule } from '../schedule/entities/schedule.entity';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private mailerService: MailerService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM) 
  async sendDayBeforeNotifications() {
    this.logger.log('sendDayBeforeNotifications: START');
    const dateToSend = new Date();
    dateToSend.setDate(dateToSend.getDate() + 1);

    const schedules = await this.scheduleRepository.find({
      where: {
        date: dateToSend.toISOString().split('T')[0],
        is_free: false,
      },
      relations: ['patient', 'doctor'],
    });

    for (const schedule of schedules) {
      await this.mailerService.sendMail({
        to: schedule.patient.email, 
        subject: 'Напоминание о приеме',
        text: `${dateToSend.toISOString().split('T')[0]} | Привет ${schedule.patient.name}! Напоминаем, что вы записаны к ${schedule.doctor.spec} завтра в ${schedule.time_from.toLocaleTimeString()}!`,
      });
      this.logger.log(
        `sendDayBeforeNotifications: FINISH `,
        );
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async sendTwoHoursBeforeNotifications() {
    this.logger.log('sendTwoHoursBeforeNotifications: START');
    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    const schedules = await this.scheduleRepository
      .createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.patient', 'patient')
      .leftJoinAndSelect('schedule.doctor', 'doctor')
      .where('schedule.date = :date', { date: now.toISOString().split('T')[0] })
      .andWhere('schedule.time_from >= :now', { now: now.toISOString() })
      .andWhere('schedule.time_from < :twoHoursLater', { twoHoursLater: twoHoursLater.toISOString() })
      .andWhere('schedule.is_free = :isFree', { isFree: false })
      .getMany();
    

    for (const schedule of schedules) {
      await this.mailerService.sendMail({
        to: schedule.patient.email, 
        subject: 'Ваш прием скоро начнется',
        text: `${now.toISOString().split('T')[0]} | Привет ${schedule.patient.name}! Через 2 часа у вас прием у ${schedule.doctor.spec} в ${schedule.time_from.toLocaleTimeString()}!`,
      });
    }
    this.logger.log(
        `sendTwoHoursBeforeNotifications: FINISH `,
        );
  }
}