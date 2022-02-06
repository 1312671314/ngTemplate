export type Response<T> = {
  data: T;
  code: string;
  success: boolean;
  message: string;
};
