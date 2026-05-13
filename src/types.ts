export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface HttpResult {
  status: number;
  data: unknown;
  headers: Record<string, string>;
}
