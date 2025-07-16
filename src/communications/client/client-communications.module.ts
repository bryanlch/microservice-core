import { Module } from '@nestjs/common';
import { ClientCommunicationsService } from './client-communications.service';
import { RabbitMqModule } from '../rabbitmq/rabbitmq.module';
import { RABBITMQ_SERVICES } from '../rabbitmq/rabbitmq.constants';

@Module({
  imports: [
    RabbitMqModule.register({
      name: RABBITMQ_SERVICES.NOTIFICATIONS,
      queueKey: 'NOTIFICATIONS_QUEUE',
    }),
  ],
  providers: [ClientCommunicationsService],
  exports: [ClientCommunicationsService],
})
export class ClientCommunicationsModule {}
