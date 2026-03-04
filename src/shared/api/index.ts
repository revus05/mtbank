export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiRequest<T>(
  input: string,
  options?: RequestOptions,
): Promise<T> {
  const response = await fetch(input, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiResponse<T>
    | { message?: string }
    | null;

  if (!response.ok) {
    throw new ApiError(
      payload && "message" in payload && payload.message
        ? payload.message
        : "Ошибка запроса",
      response.status,
    );
  }

  return payload && "data" in payload ? payload.data : (payload as T);
}
