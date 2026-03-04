import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = (url: string) =>
  fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
    credentials: "include",
    prepareHeaders: async (headers) => {
      if (typeof window === "undefined") {
        const { cookies } = await import("next/headers");

        const cookieStore = await cookies();
        const cookieString = cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join("; ");

        if (cookieString) {
          headers.set("cookie", cookieString);
        }
      }

      return headers;
    },
  });

export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type BaseError<T> = {
  status: number;
  message: string;
  data: T | null;
};

export class ApiError<T> extends Error {
  status: number;
  data: T | null;

  constructor(response: BaseError<T>) {
    super(response.message || "An error occurred");
    this.status = response.status;
    this.data = response.data ?? null;
  }
}

export const getApiError = <T = unknown>(e: unknown): ApiError<T> => {
  const safeError = (msg: string) =>
    new ApiError<T>({ status: 500, message: msg, data: null });

  const isObjectWithData = (obj: unknown): obj is { data: unknown } =>
    typeof obj === "object" && obj !== null && "data" in obj;

  if (!isObjectWithData(e)) {
    return safeError(
      e instanceof Error ? e.message : "Произошла неизвестная ошибка",
    );
  }

  if (!isObjectWithData(e.data)) {
    return safeError(
      e.data instanceof Error ? e.data.message : "Произошла неизвестная ошибка",
    );
  }

  const errObj = e.data as {
    status: number | string;
    data?: T;
    error?: string;
  };

  return new ApiError<T>({
    status: Number(errObj.status) || 500,
    message: errObj.error || "Ошибка запроса",
    data: errObj.data ?? null,
  });
};
