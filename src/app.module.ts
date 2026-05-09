import { Module } from '@nestjs/common';
import { LoggerModule } from 'pino-nestjs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/typeorm/typeorm.config';
import { CacheModule } from '@nestjs/cache-manager';
import { GlobalAuthModule } from './shared/global-auth.module';
import { loggerConfig } from './config/logger/logger.config';
import { redisCacheConfig } from './infrastructure/cache/cache.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpCacheInterceptor } from '@interceptor/http-cache.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoggerModule.forRoot(loggerConfig),
    CacheModule.registerAsync(redisCacheConfig),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    GlobalAuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
  ],
})
export class AppModule {}
