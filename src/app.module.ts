import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm/typeorm.config';
import { validationSchema } from './config/env.validation';
import { CacheModule } from '@nestjs/cache-manager';
import { GlobalAuthModule } from './shared/global-auth.module';
import { HealthModule } from './features/health/health.module';
import { ClientCommunicationsModule } from './communications/client/client-communications.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RabbitmqAckInterceptor } from './interceptors/rabbitmq-ack.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      //validationSchema,
    }),
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    GlobalAuthModule,
    ClientCommunicationsModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RabbitmqAckInterceptor,
    },
  ],
})
export class AppModule {
  constructor() {}
}
