import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppMessages } from './constants/messages.constants';
import { SwaggerModule } from '@nestjs/swagger';
import { config, custom, options } from './config/swagger/swagger.config';
import { winstonConfig } from './config/logger/logger.config';
import { WinstonModule } from 'nest-winston';
import { ExceptionFilterMessage } from './config/filter/exception.filter';
import { getRabbitMQConfig } from './config/rabbitmq/rabbitmq.config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;
  const prefix = configService.get<string>('GLOBAL_PREFIX') ?? '/api/v1';
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';
  const isProduction = nodeEnv === 'production';

  if (!isProduction) {
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api', app, document, custom);
    logger.log(AppMessages.SWAGGER_AVAILABLE);
  }

  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new ExceptionFilterMessage());
  app.enableCors();

  // ✅ Conecta microservicio Rabbit usando config separada
  try {
    const rabbitMQConfig = getRabbitMQConfig(configService);
    app.connectMicroservice(rabbitMQConfig);
    await app.startAllMicroservices();

    logger.log(AppMessages.RABBITMQ_SUCCESS);
  } catch (error) {
    logger.error(
      AppMessages.RABBITMQ_ERROR.replace('{message}', error.message),
    );
    logger.warn(AppMessages.RABBITMQ_FALLBACK);
  }

  await app.listen(port);
  logger.log(AppMessages.SERVER_LISTENING.replace('{port}', port.toString()));
  logger.log(AppMessages.ENVIRONMENT.replace('{env}', nodeEnv));
}

bootstrap();
