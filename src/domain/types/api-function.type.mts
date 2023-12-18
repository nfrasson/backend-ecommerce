export type APIFunction = (
  body: any
) => Promise<{ statusCode: number; body: any; headers?: any }>;
