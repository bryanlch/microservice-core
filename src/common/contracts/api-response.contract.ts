export interface ApiResponse<T> {
  message: string;
  data: T;
  traceId: string;
  statusCode: number;
  timestamp: string;
}
