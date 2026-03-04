type ApiErrorLike = {
  status?: number;
  data?: unknown;
};

export function isFetchBaseQueryError(error: unknown): error is ApiErrorLike {
  return typeof error === "object" && error !== null && "status" in error;
}

export function isApiErrorWithMessage(
  error: unknown,
): error is { data: { message: string } } {
  return (
    isFetchBaseQueryError(error) &&
    typeof error.data === "object" &&
    error.data !== null &&
    "message" in error.data &&
    typeof (error.data as { message?: unknown }).message === "string"
  );
}
