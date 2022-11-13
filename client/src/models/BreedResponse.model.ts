export interface APIResponse<T> {
  status: number;
  info?: T;
  error?: string;
}
