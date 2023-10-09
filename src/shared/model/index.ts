export interface APIResponse<T> {
  succeed: boolean;
  result: T;
  error: string | null;
  status: string;
  statusCode: number;
}
