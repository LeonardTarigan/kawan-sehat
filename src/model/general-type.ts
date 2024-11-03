export interface IResponse<T> {
  data: T;
  error: string | null;
  message: string;
}

export interface IPagination {
  limit: number;
  page: number;
  count: number;
}

export interface IErrorResponse {
  response: {
    data: {
      error: string;
      message: string;
    };
    status: number;
  };
}
