import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

const config = new DocumentBuilder()
  .addServer('payment')
  .setTitle('Payment Service')
  .setDescription('API for Payment Service')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header',
    name: 'Authorization',
    description: 'Coloca aquí tu token JWT',
  }, 'bearer')
  .addSecurityRequirements('bearer')
  .build();

const options: SwaggerDocumentOptions = {
  deepScanRoutes: true,
};

const custom: SwaggerCustomOptions = {
  explorer: true,
  useGlobalPrefix: true,
};

export { config, options, custom };
