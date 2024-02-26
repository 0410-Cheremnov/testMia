import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';

@Module({
  imports: [
    MailerModule.forRoot({
        transport: {
            host: 'host', 
            port: 465, 
            secure: false, 
            auth: {
              user: 'user', 
              pass: 'password' 
            }
          },
          defaults: {
            from: '"no-reply" <no-reply@example.com>', 
          }
    }),
    ScheduleModule.forRoot(), 
    TypeOrmModule.forFeature([Schedule]), 

  ],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}