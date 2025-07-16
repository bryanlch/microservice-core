// src/config/rabbitmq/rabbitmq.config.ts
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export const getRabbitMQConfig = (
  configService: ConfigService,
): MicroserviceOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [configService.get<string>('RABBITMQ_URI')],
    queue: configService.get<string>('CORE_QUEUE'),
    queueOptions: {
      durable: false,
    },
    noAck: false,
  },
});
