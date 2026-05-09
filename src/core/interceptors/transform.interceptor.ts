import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE_KEY } from '../../common/decorators/response-message.decorator';

import { ApiResponse } from '../../common/contracts/api-response.contract';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ||
      'Success';

    const now = new Date();
    // Intenta extraer el traceId que se puede haber seteado antes, sino lo genera
    const traceId = request.headers['x-trace-id'] || this.generateTraceId(now);

    return next.handle().pipe(
      map((data) => ({
        message,
        data,
        traceId,
        statusCode: response.statusCode,
        timestamp: now.toISOString(),
      })),
    );
  }

  private generateTraceId(now: Date): string {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  }
}
