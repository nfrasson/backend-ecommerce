export interface ValidationMiddlewareInterface {
  validate: (dto: any) => Promise<void>;
}
