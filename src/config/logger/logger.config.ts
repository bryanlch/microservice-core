import { Params } from 'pino-nestjs';

export const loggerConfig: Params = {
  pinoHttp: {
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              singleLine: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
              colorize: true,
            },
          }
        : undefined,

    serializers: {
      req: (req) => ({
        id: req.id,
        method: req.method,
        url: req.url,
      }),
    },
  },
};
