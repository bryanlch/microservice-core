import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm/typeorm.config';
import { validationSchema } from './config/env.validation';
import { CacheModule } from '@nestjs/cache-manager';
import { GlobalAuthModule } from './shared/global-auth.module';
import { RabbitmqModule } from './communications/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    GlobalAuthModule,
    RabbitmqModule,
  ],
})
export class AppModule {
  constructor() {}
}
