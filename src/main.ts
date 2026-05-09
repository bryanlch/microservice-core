import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  Logger as NestLogger,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { config, custom, options } from './config/swagger/swagger.config';
import { Logger } from 'pino-nestjs';
import { ExceptionFilterMessage } from './core/filters/exception/exception.filter';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { scalarConfig } from './config/swagger/scalar.config';
import { apiReference } from '@scalar/nestjs-api-reference';
import { APP_MESSAGES } from '@constant/messages.constants';
import { formatLog } from '@utils/format-message.util';

async function bootstrap() {
  const logger = new NestLogger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;
  const prefix = configService.get<string>('GLOBAL_PREFIX') ?? '/api';
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';
  const isProduction = nodeEnv === 'production';

  if (!isProduction) {
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api', app, document, custom);
    logger.log(
      formatLog(APP_MESSAGES.SYSTEM.SWAGGER_AVAILABLE, { path: '/docs' }),
    );

    app.use(
      '/docs',
      apiReference({
        ...scalarConfig,
        spec: {
          content: document,
        },
      }),
    );
  }

  app.setGlobalPrefix(prefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new ExceptionFilterMessage());
  app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));
  app.enableCors();

  await app.listen(port);
  logger.log(formatLog(APP_MESSAGES.SYSTEM.SERVER_LISTENING, { port }));
  logger.log(formatLog(APP_MESSAGES.SYSTEM.ENVIRONMENT, { env: nodeEnv }));
}

bootstrap();
