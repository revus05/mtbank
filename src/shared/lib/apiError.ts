import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
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
    typeof error.data.message === "string"
  );
}
