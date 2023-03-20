export interface Response<T> {
  data: T;
  statusCode: number;
  message: string;
}
