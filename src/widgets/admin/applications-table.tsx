"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AppStatusBadge } from "entities/application/ui/app-status-badge";
import { ApproveButton } from "features/review-application/ui/approve-button";
import { RejectButton } from "features/review-application/ui/reject-button";
import { useMemo, useState } from "react";
import { formatDate } from "shared/lib";
import type { Application } from "shared/types";
import { Input } from "shared/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shared/ui/table";

export function ApplicationsTable({
  applications,
  onRefresh,
}: {
  applications: Application[];
  onRefresh: () => void;
}) {
  const [filter, setFilter] = useState("");

  const columns = useMemo<ColumnDef<Application>[]>(
    () => [
      { accessorKey: "companyName", header: "Компания" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Телефон" },
      {
        accessorKey: "createdAt",
        header: "Дата",
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        accessorKey: "status",
        header: "Статус",
        cell: ({ row }) => <AppStatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) =>
          row.original.status === "pending" ? (
            <div className="flex justify-end gap-2">
              <ApproveButton
                applicationId={row.original.id}
                onComplete={onRefresh}
              />
              <RejectButton
                applicationId={row.original.id}
                onComplete={onRefresh}
              />
            </div>
          ) : null,
      },
    ],
    [onRefresh],
  );

  const table = useReactTable({
    data: applications,
    columns,
    state: { globalFilter: filter },
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <section className="space-y-4">
      <Input
        placeholder="Поиск по компании, email или телефону"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <div className="overflow-x-auto rounded-2xl border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  Ничего не найдено
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
