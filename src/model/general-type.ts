export interface IResponse<T> {
  data: T;
  error: string | null;
  message: string;
}
