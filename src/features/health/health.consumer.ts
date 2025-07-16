import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AckAfter } from 'src/decorators/ack-after.decorator';

@Controller()
export class HealthCheckConsumerHandler {
  constructor(private readonly configService: ConfigService) {}

  @AckAfter()
  @MessagePattern('core-microservice')
  handleHealthCheck(@Payload() payload: any, @Ctx() context: RmqContext) {
    const now = new Date();

    if (!payload || !payload.timestamp) {
      return {
        status: 'error',
        message: 'Invalid payload',
      };
    }

    const receivedTime = new Date(payload.timestamp);
    const diff = now.getTime() - receivedTime.getTime();

    return {
      status: 'alive',
      service: this.configService.get<string>('APP_NAME'),
      lastServiceCheck: payload.service,
      timestamp: now.toISOString(),
      receivedTimestamp: payload.timestamp,
      latency: diff > 0 ? `${diff} ms` : '0 ms',
    };
  }
}
