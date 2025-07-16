import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class ExceptionFilterMessage implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionFilterMessage.name);

  catch(exception: any, host: ArgumentsHost) {
    const now = new Date();
    const traceId = this.generateTraceId(now);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const ip = request.ip || request.connection.remoteAddress;

    const { statusCode, message, errorDetails } =
      this.determineErrorResponse(exception);

    this.logger.error({
      message: `Exception with status: ${statusCode} and message: "${message}"`,
      traceId,
      exception,
    });

    response.status(statusCode).json({
      ip,
      message,
      traceId,
      statusCode,
      timestamp: now.toISOString(),
      ...(errorDetails && { errorDetails }),
    });
  }

  private generateTraceId(now: Date): string {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(2, '0');

    const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

    // const randomString = Array.from({ length: 16 }, () =>
    //   Math.random().toString(36).charAt(2).toUpperCase(),
    // ).join('');
    //const traceId = `${formattedDate}-${randomString}`;

    return formattedDate;
  }

  private determineErrorResponse(exception: any): {
    statusCode: number;
    message: string;
    errorDetails?: any;
  } {
    if (exception instanceof HttpException) {
      return {
        statusCode: exception.getStatus(),
        message: this.extractMessage(exception.getResponse()),
      };
    }

    if (exception.code && exception.sqlMessage) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Database error: ' + exception?.sqlMessage,
        errorDetails: {
          code: exception.code,
          errno: exception.errno,
          sqlState: exception.sqlState,
          sqlMessage: exception.sqlMessage,
          sql: exception.sql,
        },
      };
    }

    if (exception.status && exception.response) {
      return {
        statusCode: exception.status,
        message: this.extractMessage(exception.response),
      };
    }

    if (exception.message) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    };
  }

  private extractMessage(response: any): string {
    if (!response) return 'Unknown error';
    if (typeof response === 'string') return response;
    if (Array.isArray(response.message)) return response.message.join(', ');
    return response.message || JSON.stringify(response);
  }
}
