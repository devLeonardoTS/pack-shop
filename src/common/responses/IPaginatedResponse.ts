export interface IPaginatedResponse<T> {
  total: number;
  pages: number;
  previous: boolean;
  next: boolean;
  data: T[];
}
