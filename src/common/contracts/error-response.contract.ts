import { ApiResponse } from './api-response.contract';

export interface ErrorResponse extends ApiResponse<null> {
  ip: string;
  errorDetails?: any;
}
