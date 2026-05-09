// src/common/constants/app-messages.constant.ts

export const APP_MESSAGES = {
  SYSTEM: {
    BOOTSTRAP_START: '🚀 Starting application bootstrap...',
    SERVER_LISTENING: '🚀 Server is listening on port {port}',
    ENVIRONMENT: '🌍 Environment: {env}',
    GLOBAL_PREFIX: '🔗 Global prefix set to: {prefix}',
    SHUTDOWN_HOOKS: '🔌 Shutdown hooks enabled',
    VALIDATION_PIPE: '🛡️  Validation pipe configured',
    SWAGGER_AVAILABLE: '📚 Swagger documentation available at {path}',
  },

  SERVICES: {
    RABBITMQ: {
      CONNECTING: '🔌 Connecting to RabbitMQ at {host}:{port}...',
      CONNECTED: '✅ RabbitMQ microservice connected successfully',
      ERROR: '❌ RabbitMQ connection error: {message}',
      FALLBACK: '⚠️  Application will continue without RabbitMQ microservice',
    },
    REDIS: {
      CONNECTING: '🔌 Connecting to Redis microservice...',
      CONNECTED: '📡 Redis connected successfully',
      ERROR: '⚠️  Could not connect to Redis: {message}',
    },
  },

  // Errores Generales del Sistema
  ERRORS: {
    CONFIG_MISSING: '❌ Configuration missing for key: {key}',
    BOOTSTRAP_FAILED: '💥 Application bootstrap failed',
    UNEXPECTED: '🔥 Unexpected error occurred',
  },
} as const;
