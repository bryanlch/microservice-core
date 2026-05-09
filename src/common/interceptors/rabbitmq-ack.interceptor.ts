// interceptors/rabbitmq-ack.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { RmqContext } from '@nestjs/microservices';
import { ACK_AFTER_KEY } from '../decorators/ack-after.decorator';

@Injectable()
export class RabbitmqAckInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isAckAfter = this.reflector.get<boolean>(
      ACK_AFTER_KEY,
      context.getHandler(),
    );

    const rmqContext = context.getArgByIndex(2) as RmqContext;

    return next.handle().pipe(
      tap(() => {
        if (isAckAfter && rmqContext) {
          const channel = rmqContext.getChannelRef();
          const originalMsg = rmqContext.getMessage();
          channel.ack(originalMsg);
        }
      }),
    );
  }
}
