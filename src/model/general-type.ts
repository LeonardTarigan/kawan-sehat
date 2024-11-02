export interface IResponse<T> {
  data: T;
  error: string | null;
  message: string;
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
