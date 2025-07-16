import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientCommunicationsService } from 'src/communications/client/client-communications.service';

// src/health/health-check.service.ts
@Injectable()
export class HealthCheckCustomService {
  constructor(
    private readonly rabbitmqService: ClientCommunicationsService,
    private readonly configService: ConfigService,
  ) {}

  async pingMicroserviceByMessage(name: string) {
    try {
      const queueName = `${name}`;

      const result = await this.rabbitmqService.sendNotification(queueName, {
        timestamp: new Date().toISOString(),
        service: this.configService.get<string>('APP_NAME'),
      });

      if (!result) {
        throw new Error('No response from microservice');
      }

      return {
        status: 'ok',
        received: result,
      };
    } catch (error) {
      throw error;
    }
  }
}
