// src/common/interceptors/http-cache.interceptor.ts
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable, CallHandler } from '@nestjs/common';
import { Logger } from '@nestjs/common'; // Ojo: Usamos el Logger que inyecta Nest (que por debajo es Pino)
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  private readonly logger = new Logger(HttpCacheInterceptor.name);

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    if (request.method !== 'GET') {
      return next.handle();
    }

    const observable = await super.intercept(context, next);
    return observable.pipe(
      tap(() => {
        // Esta parte se ejecuta si la respuesta NO vino del caché (se generó nueva)
        // Podrías loguear "Cache MISS" aquí si quisieras, pero es ruidoso.
      }),
    );
  }

  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const { httpAdapter } = this.httpAdapterHost;

    const isHttpApp = httpAdapter && !!request.method;

    if (!isHttpApp || request.method !== 'GET') {
      return undefined;
    }

    const key = httpAdapter.getRequestUrl(request);
    return key;
  }
}
