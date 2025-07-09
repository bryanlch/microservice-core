export enum AppMessages {
  BOOTSTRAP_START = '🚀 Starting application bootstrap...',
  SWAGGER_AVAILABLE = '📚 Swagger documentation available at /api',
  SERVER_LISTENING = '🚀 Server is listening on port {port}',
  ENVIRONMENT = '🌍 Environment: {env}',
  VALIDATION_PIPE = '🛡️  Validation pipe configured',
  SHUTDOWN_HOOKS = '🔌 Enable shutdown hooks',
  GLOBAL_PREFIX = '🔗 Global prefix set to: {prefix}',
  RABBITMQ_CONNECTING = '🔌 Connecting to RabbitMQ at {host}:{port}...',
  RABBITMQ_SUCCESS = '✅ RabbitMQ microservice connected successfully',
  RABBITMQ_ERROR = '❌ RabbitMQ connection error: {message}',
  RABBITMQ_FALLBACK = '⚠️  Application will continue without RabbitMQ microservice',
}

export enum ErrorMessages {
  CONFIG_MISSING = '❌ Configuration missing for: {key}',
  BOOTSTRAP_FAILED = '💥 Application bootstrap failed',
}
