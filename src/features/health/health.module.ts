import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckCustomService } from './health.service';
import { HealthCheckConsumerHandler } from './health.consumer';
import { ClientCommunicationsModule } from 'src/communications/client/client-communications.module';

@Module({
  imports: [TerminusModule, ConfigModule, ClientCommunicationsModule],
  controllers: [HealthController, HealthCheckConsumerHandler],
  providers: [HealthCheckCustomService],
})
export class HealthModule {}
