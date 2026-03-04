"use client";

import { useCallback, useEffect, useState } from "react";
import type { Application } from "shared/types";
import { ApplicationsTable } from "widgets/admin/applications-table";

export default function AdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  const loadApplications = useCallback(async () => {
    const response = await fetch("/api/applications", { cache: "no-store" });
    const payload = (await response.json()) as { data: Application[] };
    setApplications(payload.data);
  }, []);

  useEffect(() => {
    void loadApplications();
  }, [loadApplications]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-6">
      <header>
        <h1 className="text-2xl font-semibold">Админ-панель заявок</h1>
      </header>
      <ApplicationsTable
        applications={applications}
        onRefresh={loadApplications}
      />
    </main>
  );
}
