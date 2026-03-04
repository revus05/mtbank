"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Partner } from "shared/types";
import { Badge } from "shared/ui/badge";
import { Input } from "shared/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shared/ui/table";

const levels: Record<Partner["loyaltyLevel"], string> = {
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
};

export function PartnerCatalogTable({ partners }: { partners: Partner[] }) {
  const [filter, setFilter] = useState("");

  const columns = useMemo<ColumnDef<Partner>[]>(
    () => [
      { accessorKey: "companyName", header: "Компания" },
      { accessorKey: "description", header: "Описание" },
      {
        accessorKey: "loyaltyLevel",
        header: "Уровень",
        cell: ({ row }) => (
          <Badge variant="secondary">{levels[row.original.loyaltyLevel]}</Badge>
        ),
      },
      {
        id: "details",
        header: "",
        cell: ({ row }) => (
          <Link
            href={`/partners/${row.original.id}`}
            className="font-medium text-primary hover:underline"
          >
            Подробнее
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: partners,
    columns,
    state: { globalFilter: filter },
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <section className="space-y-4">
      <Input
        placeholder="Поиск по компаниям"
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
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  Партнеры не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
