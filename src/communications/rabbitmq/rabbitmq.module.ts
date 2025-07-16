// rabbitmq.module.ts
import { Module, DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

interface RabbitMqOptions {
  name: string;
  queueKey: string; // e.g. 'CORE_QUEUE', 'ANOTHER_QUEUE'
}

@Module({})
export class RabbitMqModule {
  static register(options: RabbitMqOptions): DynamicModule {
    const providerName = options.name;
    const queueKey = options.queueKey;
    return {
      module: RabbitMqModule,
      imports: [
        ConfigModule,
        ClientsModule.registerAsync([
          {
            name: providerName,
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [config.get<string>('RABBITMQ_URI')],
                queue: config.get<string>(queueKey),
                replyQueue: 'amq.rabbitmq.reply-to',
                queueOptions: { durable: false },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule], // exportas el provider
    };
  }
}
