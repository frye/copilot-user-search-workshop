export interface Result {
  status: number;
  body: unknown;
}

export function searchUsers(_params: URLSearchParams): Result {
  return {
    status: 501,
    body: { error: { code: 'NOT_IMPLEMENTED', message: 'Search is the workshop exercise.' } },
  };
}
