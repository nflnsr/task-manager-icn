"use client";

import * as React from "react";
import { useQueryParams } from "@/hooks/use-query-params";
import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import type { Response } from "@/types/response";
import type { Task } from "@/types/api/task";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, ChevronDown, Copy, MoreHorizontal, Pen } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteTaskBtn } from "./delete-task-btn";
import { MarkTaskBtn } from "./mark-task-btn";
import Link from "next/link";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className=""
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  // {
  //   accessorKey: "name",
  //   header: "Name / User ID (Creator)",
  //   cell: ({ row }) => (
  //     <div className="truncate capitalize">{row.getValue("name")}</div>
  //   ),
  //   size: 200,
  // },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left has-[>svg]:px-0"
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left has-[>svg]:px-0"
        >
          Description
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "completed",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const completed = row.getValue("completed");
      return (
        <div
          className={`w-full max-w-20 mx-auto text-center rounded-sm px- py-1 pb-1.5 font-medium text-white ${completed ? "bg-green-600" : "bg-yellow-500"}`}
        >
          {completed ? "Completed" : "Progress"}
        </div>
      );
    },
  },
  {
    // id: "actions",
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    enableHiding: true,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="mx-auto flex">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-full mx-auto text-center">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(item.title);
                toast.success("Title copied to clipboard");
              }}
            >
              <Button className="flex w-full justify-between text-white hover:text-black hover:bg-white">
                Copy Title <Copy className="size-4 stroke-2" />
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(item.description);
                toast.success("Description copied to clipboard");
              }}
            >
              <Button className="flex w-full justify-between text-white hover:text-black hover:bg-white">
                Copy Desc <Copy className="size-4 stroke-2 " />
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteTaskBtn taskId={item.id} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/dashboard/edit-task/${item.id}`} className="w-full">
                <Button
                  variant="outline"
                  className="w-full flex justify-between bg-yellow-500 text-white hover:bg-yellow-500/80 hover:text-white"
                >
                  Edit <Pen className="size-4 stroke-2" />
                </Button>
              </Link>
            </DropdownMenuItem>
            {!item.completed && (
              <DropdownMenuItem>
                <MarkTaskBtn taskId={item.id} />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DashboardTable() {
  const axiosPrivate = useAxiosPrivate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const queryParams = useQueryParams();
  const statusFilter = queryParams.get("completed") ?? "";

  const { data: dataTasks, isLoading: isLoadingTasks } = useQuery({
    queryKey: ["tasks", statusFilter],
    queryFn: async () => {
      const { data } = await axiosPrivate.get("/api/tasks/my-tasks", {
        params: {
          ...(statusFilter &&
            statusFilter !== "2" && {
              // filters: JSON.stringify({
              completed: Number(statusFilter),
              // }),
            }),
        },
      });
      return data as Response<Task>;
    },
    // staleTime: 0,
    retry: 2,
  });

  const memoizedData = useMemo(() => {
    console.log(dataTasks);
    return dataTasks?.data ?? [];
  }, [dataTasks]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: memoizedData as Task[],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="py-4">
      <div className="flex items-center gap-5 pb-4 px-4">
        {/* <Input
          placeholder="Filter emails..."
          defaultValue={queryParams.get("searchFilter")?.toString() ?? ""}
          onChange={(event) =>
            queryParams.set("searchFilter", event.target.value)
          }
          className="max-w-64"
        /> */}
        <Select
          defaultValue={queryParams.get("completed")?.toString() ?? ""}
          onValueChange={(value) => {
            queryParams.set("completed", value);
          }}
        >
          <SelectTrigger className="w-[180px] border-b-2">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="2">All</SelectItem>
              <SelectItem value="1">Completed</SelectItem>
              <SelectItem value="0">Progress</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-38">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const header = table
                  .getHeaderGroups()
                  .flatMap((headerGroup) => headerGroup.headers)
                  .find((h) => h.column.id === column.id);

                const renderedHeader = header
                  ? flexRender(column.columnDef.header, header.getContext())
                  : column.id;

                const isButtonOrSpan =
                  React.isValidElement(renderedHeader) &&
                  (renderedHeader.type === Button || renderedHeader.type === "span");

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className={`capitalize${isButtonOrSpan ? "pointer-events-none cursor-default opacity-60" : ""}`}
                    checked={column.getIsVisible()}
                    onCheckedChange={
                      isButtonOrSpan
                        ? undefined
                        : (value: boolean) => column.toggleVisibility(!!value)
                    }
                  >
                    {renderedHeader}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border max-w-[calc(100%-2rem)] mx-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ width: header.column.columnDef.size }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoadingTasks ? (
              <TableRow className="mx-auto w-full text-center">
                <TableCell colSpan={columns.length} className="h-24">
                  <div className="mx-auto size-8 animate-spin rounded-full border-t-2 border-b-2 border-gray-800" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    return (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <TableCell key={cell.id} className="">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 w-full p-0 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 pb-4 px-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2 pt-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
