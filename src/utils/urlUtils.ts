type Primitive = string | number | boolean | null | undefined;

type QueryParams = Record<string, Primitive>;

const isPrimitive = (value: unknown): value is Primitive => {
  const valueType = typeof value;
  return (
    value === null ||
    valueType === "string" ||
    valueType === "number" ||
    valueType === "boolean" ||
    valueType === "undefined"
  );
};

export const buildQueryString = <T extends object>(params?: T) => {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params as Record<string, unknown>).forEach(([key, value]) => {
    if (!isPrimitive(value) || value === undefined || value === null) return;
    searchParams.append(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

export const buildQueryFromRecord = (params: QueryParams = {}) =>
  buildQueryString(params);
