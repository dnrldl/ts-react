export interface Page<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last?: boolean;
  sortBy?: string | null;
  direction?: string;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last?: boolean;
  sortBy?: string | null;
  direction?: string;
}
