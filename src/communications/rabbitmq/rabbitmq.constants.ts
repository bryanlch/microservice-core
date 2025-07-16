// src/communications/rabbitmq/constants/rabbitmq.constants.ts

// Default reply queue for RabbitMQ
// This is typically used for responses to messages sent to RabbitMQ.
export const RABBITMQ_DEFAULT_REPLY_QUEUE = 'amq.rabbitmq.reply-to';

// Default names for RabbitMQ services producer
export const RABBITMQ_SERVICES = {
  CORE: 'CORE_SERVICE',
  NOTIFICATIONS: 'NOTIFICATIONS_SERVICE',
} as const;

export type RabbitMQServiceKeys = keyof typeof RABBITMQ_SERVICES;
