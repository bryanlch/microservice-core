import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  constructor(@Inject('RABBITMQ_SERVICE') private client: ClientProxy) {}

  emit<T>(pattern: string, data: T) {
    return this.client.emit(pattern, data);
  }

  send<T = any, R = any>(pattern: string, data: T) {
    return this.client.send<R, T>(pattern, data);
  }
}
