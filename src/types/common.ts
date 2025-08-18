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

export type PageResponse<T> = {
  content: T[];
  page: number; // 0-based
  size: number;
  totalElements: number;
  totalPages: number; // 예: 6면 0~5 페이지
  sortBy: string | null;
  direction: "ASC" | "DESC" | null;
  last: boolean; // 서버가 주는 끝 여부
};
