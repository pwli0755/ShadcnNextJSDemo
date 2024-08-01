"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { DataTableColumnHeader } from "./data-table-column-header";
import { title } from "process";
import { Span } from "next/dist/trace";
import { DataTableRowActions } from "./data-table-actions";
import { BirdIcon, CupSoda, Cat } from "lucide-react";

export const teams = [
  {
    label: "Alpha",
    value: "alpha",
    icon: Cat,
  },
  {
    label: "Delta",
    value: "delta",
    icon: CupSoda,
  },
  {
    label: "Canary",
    value: "canary",
    icon: BirdIcon,
  },
];

export const EmployeeSchema = z.object({
  id: z.coerce.number(),

  firstname: z.coerce.string(),
  lastname: z.coerce.string(),
  team: z.enum(["alpha", "delta", "canary"]),
  isTeamLeader: z.coerce.boolean(),
  avatar: z.coerce.string().optional(),
});

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employee = z.infer<typeof EmployeeSchema>;

export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "avatar",
    header: () => <span> Avatar</span>,
    cell: ({ row }) => {
      const avatar: string = row.getValue("avatar");
      const firstname: string = row.getValue("firstname");
      const lastname: string = row.getValue("lastname");

      return (
        <Avatar>
          {!!avatar && (
            <AvatarImage
              height={40}
              width={40}
              src={avatar}
              alt={`${firstname} ${lastname} avatar`}
            />
          )}
          <AvatarFallback className="uppercase">
            {firstname[0]}
            {lastname[0]}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First name" />
    ),
    cell: ({ row }) => row.getValue("firstname"),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last name" />
    ),
  },
  {
    accessorKey: "team",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Team" />
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "isTeamLeader",
    header: "",
    cell: ({ row }) => {
      const isTeamLeader: boolean = row.getValue("isTeamLeader");
      return isTeamLeader ? (
        <Badge variant={"success"}> Team leader</Badge>
      ) : null;
    },
    enableGlobalFilter: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
