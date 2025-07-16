import { Inject, Injectable, Logger } from '@nestjs/common';
import { RABBITMQ_SERVICES } from '../rabbitmq/rabbitmq.constants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class ClientCommunicationsService {
  private readonly clients: Record<string, ClientProxy>;

  constructor(
    @Inject(RABBITMQ_SERVICES.NOTIFICATIONS)
    private notificationsClient: ClientProxy,
  ) {
    this.clients = {
      NOTIFICATIONS: notificationsClient,
    };
  }

  async sendNotification<T = any, R = any>(
    pattern: string,
    data: T,
  ): Promise<R> {
    const client = this.clients.NOTIFICATIONS;
    if (!client)
      throw new Error(`RabbitMQ client not found for service: NOTIFICATIONS`);

    return await firstValueFrom(
      this.notificationsClient.send(pattern, data).pipe(timeout(5000)),
    );
  }

  emit<T>(service: keyof typeof RABBITMQ_SERVICES, pattern: string, data: T) {
    const client = this.clients[service];
    if (!client)
      throw new Error(`RabbitMQ client not found for service: ${service}`);
    return client.emit(pattern, data);
  }

  async send<T = any, R = any>(
    service: keyof typeof RABBITMQ_SERVICES,
    pattern: string,
    data: T,
  ): Promise<R> {
    const client = this.clients[service];
    if (!client)
      throw new Error(`RabbitMQ client not found for service: ${service}`);
    return firstValueFrom(client.send(pattern, data).pipe(timeout(5000)));
  }
}
