import { Controller, Get, Param, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { HealthCheckCustomService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(
    private microservice: MicroserviceHealthIndicator,
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private readonly configService: ConfigService,
    private readonly healthCheckCustomService: HealthCheckCustomService,
  ) {}

  @Get('database')
  @HealthCheck()
  check() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }

  @Get('rabbitmq/:name/connection')
  @HealthCheck()
  checkRabbitMQConnection(@Param('name') name: string) {
    return this.health.check([
      () =>
        this.microservice.pingCheck<RmqOptions>(`rabbitmq-${name}-connection`, {
          transport: Transport.RMQ,
          options: {
            urls: [this.configService.get<string>('RABBITMQ_URL')],
            queue: this.configService.get<string>(
              `RABBITMQ_${name.toUpperCase()}_QUEUE`,
              'default',
            ),
            queueOptions: {
              durable: true,
            },
          },
        }),
    ]);
  }

  @Get('rabbitmq/:name/message')
  @HealthCheck()
  async checkRabbitMQMessage(@Param('name') name: string) {
    return await this.healthCheckCustomService.pingMicroserviceByMessage(name);
  }
}
