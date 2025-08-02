import React from "react";

interface Props<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  children: (data: T) => React.ReactNode;
}

function DataBoundary<T>({
  data,
  loading,
  error,
  loadingComponent = <div>로딩중...</div>,
  emptyComponent = <div>데이터가 없습니다.</div>,
  errorComponent,
  children,
}: Props<T>) {
  if (loading) return <>{loadingComponent}</>;
  if (error)
    return <>{errorComponent || <div>에러 발생: {error.message}</div>}</>;
  if (!data || (Array.isArray(data) && data.length === 0))
    return <>{emptyComponent}</>;

  return <>{children(data)}</>;
}

export default DataBoundary;
