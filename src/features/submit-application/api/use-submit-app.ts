"use client";

import type { ApplicationInput } from "entities/application/model/schema";
import { apiRequest } from "shared/api";
import type { Application } from "shared/types";

export async function submitApplication(payload: ApplicationInput) {
  return apiRequest<Application>("/api/applications", {
    method: "POST",
    body: payload,
  });
}
