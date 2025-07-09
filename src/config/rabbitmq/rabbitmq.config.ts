// src/config/rabbitmq/rabbitmq.config.ts
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export const getRabbitMQConfig = (
  configService: ConfigService,
): MicroserviceOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [configService.get<string>('RABBITMQ_URL')],
    queue: configService.get<string>('RABBITMQ_QUEUE'),
    queueOptions: {
      durable: true,
    },
    maxConnectionAttempts: 3,
  },
});
