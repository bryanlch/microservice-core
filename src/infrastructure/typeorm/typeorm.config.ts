import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    name: 'default',
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: Number(configService.get('DB_PORT')) || 5432,
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    connectTimeout: 10000,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
    logging: ['error', 'warn', 'schema'],
  }),
  inject: [ConfigService],
};
