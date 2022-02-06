export type Page<T> = {
  content: T[];
  first: boolean;
  last: boolean;
  count: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
};
